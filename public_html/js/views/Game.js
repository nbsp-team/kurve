define([
    'app',
    'tmpl/game',
    'tmpl/components/game-over',
    'views/AbstractScreen',
    'models/Snake',
    'models/GameField',
    'utils/api/ws/api_ws',
    'views/components/game-scores'
], function(
    app,
    tmpl,
    gameOverTmpl,
    AbstractScreen,
    Snake,
    GameField,
    Api,
    GameScoresView
){
    var View = AbstractScreen.extend({

        el: '.b-game',
        template: tmpl,

        initialize: function () {
			game_log = false;

			this.listenTo(app.wsEvents, "wsKeyEvent", this.keyEvent);
            this.listenTo(app.wsEvents, "wsGameOverEvent", this.onGameOver);
            this.listenTo(app.wsEvents, "new_round_event", this.onStartNewRound);

			this.leftRepeat = false;
			this.rightRepeat = false;

            this.gameScoresView = new GameScoresView();
        },

        onEatBonus:function(bonus_id) { this.field.onEatBonus(bonus_id); },

        onNewBonus:function(bonus) { this.field.onNewBonus(bonus); },

        onGameOver: function(msg) {
            this.field.onGameOver(msg);

            var players = msg.results;
            var selfPoints = 0;

            for(var i = 0; i < players.length; i++) {
                if(app.session.user.get('user_id') == players[i].user_id) {
                    selfPoints = players[i].points;
                }
            }

            var gameOverContainer = $('.js_game-container');
            gameOverContainer.html(gameOverTmpl({
                    'app': app,
                    'points': selfPoints
                }
            ));
        },

        snakeUpdate: function(snake) { this.field.snakeUpdate(snake); },

        start: function(options) {
			this.myId = options.myId;
			options.canvasBox = this.$el;

			this.field = new GameField(options);
            $(document).on('keydown', this.keyDown.bind(this));
            $(document).on('keyup', this.keyUp.bind(this));

            console.log("ROUND");
            console.log(options);
			
			this.field.start(options);
		},

        keyEvent: function(isLeft, isUp, sender) {
			if(isLeft){
				if(isUp){
					this.field.leftUp(sender);
				} else {
					this.field.leftDown(sender);
					//if (that.myId == sender){
						//var delay = window.performance.now()-this.fromTime;
						//console.log('serv delay '+(delay));
					
				}
			} else {
				if(isUp){
					this.field.rightUp(sender);
				} else {
					this.field.rightDown(sender);
				}
			}
		},

        Q_BUTTON: 81,
        W_BUTTON: 87,
        LEFT_BUTTON: 37,
        RIGHT_BUTTON: 39,

        keyDown: function (e) {

            switch(e.keyCode) {

                case this.Q_BUTTON:
                case this.LEFT_BUTTON:
                    if(this.leftRepeat) break;
                    this.leftRepeat = true;
                    Api.sendKeyEvent(true, false);
                    this.field.leftDown(this.myId);
                    e.preventDefault();
                    break;

                case this.W_BUTTON:
                case this.RIGHT_BUTTON:
                    if(that.rightRepeat) break;
                    that.rightRepeat = true;
                    Api.sendKeyEvent(false, false);
                    that.field.rightDown(that.myId);
                    e.preventDefault();
                    break;
            }
		},

        keyUp: function(e) {

            switch(e.keyCode) {
                case this.Q_BUTTON:
                case this.LEFT_BUTTON:
                    this.leftRepeat = false;
                    Api.sendKeyEvent(true, true);
                    this.field.leftUp(this.myId);
                    e.preventDefault();
                    break;
                case this.W_BUTTON:
                case this.RIGHT_BUTTON:
                    this.rightRepeat = false;
                    Api.sendKeyEvent(false, true);
                    this.field.rightUp(this.myId);
                    e.preventDefault();
                    break;
            }
		},	

		pause: function() {
			this.field.pause();
		},

        render: function () {
            app.preloader.hide();
            $(this.el).html(this.template({'model': this.templateArg}));            
        },

        onStartNewRound: function(options) {
            this.undelegateEvents();
            this.field.stopPlaying();
            $(document).off('keydown');
            $(document).off('keyup');
            this.listenToOnce(app.wsEvents, "GameFieldDestructed", this.onFieldDestructed(options));

        },
        onFieldDestructed: function(options){
            var options = options;
            return function(){
                this.start(options);
            }
        }
    });

    return View;
});
