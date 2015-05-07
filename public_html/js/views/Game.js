define([
    'app',
    'konva',
    'tmpl/game',
    'views/AbstractScreen',
    'models/Snake',
    'models/GameField',
    'utils/api/ws/api_ws'
], function(
    app,
    Konva,
    tmpl,
    AbstractScreen,
    Snake,
    GameField,
    Api
){
    var View = AbstractScreen.extend({

        el: '.b-game',
        template: tmpl,
        initialize: function () {			
			game_log = true;
			this.listenTo(app.wsEvents, "wsKeyEvent", this.keyEvent);
			this.listenTo(app.wsEvents, "wsStartGame", this.start);
			
			this.leftRepeat = false;
			this.rightRepeat = false;
        },
        onEatBonus:function(bonus_id){ this.field.onEatBonus(bonus_id); },
        onNewBonus:function(bonus){ this.field.onNewBonus(bonus); },
        onGameOver: function(msg){ this.field.onGameOver(); },
        snakeUpdate: function(snake){ this.field.snakeUpdate(snake); },
        start: function(options){
			this.myId = options.myId;
			options.canvasBox = this.$el;
			this.field = new GameField(options);
			document.addEventListener('keydown',    this.keyDown(),    false);
			document.addEventListener('keyup',    this.keyUp(),    false);
			
			this.field.run();
		},
        keyEvent: function(isLeft, isUp, sender){
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
		keyDown: function () {
			var that = this;
			return function (e) {
				switch(e.keyCode) {		
					case 32:
						that.playPause();
						break;
					case 81:
						if(that.leftRepeat) break;
						that.leftRepeat = true;
						Api.sendKeyEvent(true, false);
						that.field.leftDown(that.myId);						
						e.preventDefault();
						that.fromTime = window.performance.now();
						break;
					case 87:
						if(that.rightRepeat) break;
						
						that.rightRepeat = true;
						Api.sendKeyEvent(false, false);
						that.field.rightDown(that.myId);						
						e.preventDefault();
						break;
				}
			}
		},
		keyUp: function() {
			var that = this;
			return function (e) {
				switch(e.keyCode) {
					case 81:
						that.leftRepeat = false;
						Api.sendKeyEvent(true, true);
						that.field.leftUp(that.myId);
						
						
						e.preventDefault();
						break;
					case 87:
						that.rightRepeat = false;
						Api.sendKeyEvent(false, true);
						that.field.rightUp(that.myId);
						
						e.preventDefault();
						break;
				}
			}
		},	
        events: {
			'click #foreground-canvas' : 'pause'
		},
		pause: function() {
			this.field.pause();
			
		},
        render: function () {
            $(this.el).html(this.template({'model': this.templateArg}));            
        }
    });

    return View;
});
