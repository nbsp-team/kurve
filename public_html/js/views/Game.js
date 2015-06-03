define([
    'app',
    'tmpl/game',
    'views/AbstractScreen',
    'models/Snake',
    'models/GameField',
    'utils/api/ws/api_ws',
    'views/components/game-scores'
], function(
    app,
    tmpl,
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
            this.roundCounter = 1;

            this.gameScoresView = new GameScoresView();
        },

        onEatBonus:function(bonus_id) { this.field.onEatBonus(bonus_id); },

        onNewBonus:function(bonus) { this.field.onNewBonus(bonus); },

        onGameOver: function(msg) { this.field.onGameOver(msg); },

        snakeUpdate: function(snake) { this.field.snakeUpdate(snake); },

        start: function(options) {
			this.myId = options.myId;
			options.canvasBox = this.$el;

			this.field = new GameField(options);
            $(document).on('keydown', this.keyDown.bind(this));
            $(document).on('keyup', this.keyUp.bind(this));
			
			this.field.start(this.roundCounter++);
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

        keyDown: function (e) {

            switch(e.keyCode) {
                case 32:
                    this.playPause();
                    break;
                case 81:
                    if(this.leftRepeat) break;
                    this.leftRepeat = true;
                    Api.sendKeyEvent(true, false);
                    this.field.leftDown(this.myId);
                    e.preventDefault();
                    break;
                case 87:
                    if(this.rightRepeat) break;

                    this.rightRepeat = true;
                    Api.sendKeyEvent(false, false);
                    this.field.rightDown(this.myId);
                    e.preventDefault();
                    break;
            }
		},

        keyUp: function(e) {

            switch(e.keyCode) {
                case 81:
                    this.leftRepeat = false;
                    Api.sendKeyEvent(true, true);
                    this.field.leftUp(this.myId);
                    e.preventDefault();
                    break;
                case 87:
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
