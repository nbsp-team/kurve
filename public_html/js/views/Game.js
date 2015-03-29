define([
    'app',
    'konva',
    'tmpl/game',
    'views/AbstractScreen',
    'models/Snake',
    'models/GameField'
], function(
    app,
    Konva,
    tmpl,
    AbstractScreen,
    Snake,
    GameField
){
    var View = AbstractScreen.extend({

        el: '.b-game',
        template: tmpl,
        initialize: function () {
			
			this.field = new GameField();
			
			document.addEventListener('keydown',    this.keyDown(),    false);
			document.addEventListener('keyup',    this.keyUp(),    false);
			this.leftRepeat = false;
			this.rightRepeat = false;
        },
        keyDown: function () {
			var that = this;
			return function (e) {
				switch(e.keyCode) {							
					case 81:
						if(that.leftRepeat) break;
						that.leftRepeat = true;
						console.log('down');
						that.field.leftDown(0);
						e.preventDefault();
						break;
					case 87:
						if(that.rightRepeat) break;
						console.log('down');
						that.rightRepeat = true;
						that.field.rightDown(0);
						e.preventDefault();
						break;
					case 79:
						if(that.leftRepeat2) break;
						that.field.leftDown(1);
						that.leftRepeat2 = true;
						e.preventDefault();
						break;
					case 80:	
						if(that.rightRepeat2) break;
						that.rightRepeat2 = true;
						that.field.rightDown(1);
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
						that.field.leftUp(0);
						e.preventDefault();
						break;
					case 87:
						that.rightRepeat = false;
						that.field.rightUp(0);
						e.preventDefault();
						break;
					case 79:
						that.leftRepeat2 = false;
						that.field.leftUp(1);
						e.preventDefault();
						break;
					case 80:
						that.rightRepeat2 = false;
						that.field.rightUp(1);
						e.preventDefault();
						break;
				}
			}
		},
        events: {
			'click #gameContainer' : 'pause'
		},
		pause: function() {
			this.field.playPause();
		},
        render: function () {
            $(this.el).html(this.template({'model': this.templateArg}));
             
            this.field.makeStage();
        }
    });

    return View;
});
