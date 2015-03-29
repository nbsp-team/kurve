define([
    'app',
    'konva',
    'tmpl/game',
    'views/AbstractScreen',
    'models/Snake'
], function(
    app,
    Konva,
    tmpl,
    AbstractScreen,
    Snake
){
	
    var GameField = Backbone.Model.extend({
		colors: ['blue', 'red', 'yellow', 'green', 'magenta'],
		FPS : 60,
		width : 1000,
		height : 600,
        initialize: function() {
			this.backLayer = new Konva.FastLayer();
			this.foreLayer = new Konva.FastLayer();
			this.numPlayers = 5;
			this.playing = false;
			this.snakes = []
			
			for(var i = 0; i < this.numPlayers; i++) {
				this.snakes[i] = new Snake();
				var mindim = Math.min(this.width, this.height);
				var angle = i*2*Math.PI/this.numPlayers;
				var x = this.width/2 + mindim*0.25*Math.cos(angle);
                var y = this.height/2 + mindim*0.25*Math.sin(angle);
                
				this.snakes[i].init(x, y, angle+Math.PI/2, this.colors[i], this.FPS, this.backLayer, this.foreLayer);
				this.dead = 0;
			}
            
		},
		makeStage:function() {
			
			var that = this;
            this.stage = new Konva.Stage({
                container: 'gameContainer',
                width: that.width,
                height: that.height
            });
            
            this.stage.add(this.backLayer);
            this.stage.add(this.foreLayer);
		},
		leftDown: function(sender) {
			this.snakes[sender].startTurning(this.snakes[sender].TURNING_LEFT);
		},
		leftUp: function(sender) {
			this.snakes[sender].stopTurning(this.snakes[sender].TURNING_LEFT);
		},
		rightDown: function(sender) {
			this.snakes[sender].startTurning(this.snakes[sender].TURNING_RIGHT);
		},
		rightUp: function(sender) {
			this.snakes[sender].stopTurning(this.snakes[sender].TURNING_RIGHT);
		},
		playPause: function() {
			this.playing = !this.playing;
			if(this.playing) {
				console.log('running!');
				this.run();
			} else console.log('pause');
		},
        step: function () {
			for(var i = 0; i < this.numPlayers; i++) {
				if(this.snakes[i].isAlive) {
					this.snakes[i].step();
					if(this.snakes[i].x > this.width) {
						this.snakes[i].teleport(0, this.snakes[i].y);
					}
					if(this.snakes[i].x < 0) {
						this.snakes[i].teleport(this.width, this.snakes[i].y);
					}
					if(this.snakes[i].y > this.height) {
						this.snakes[i].teleport(this.snakes[i].x, 0);
					}
					if(this.snakes[i].y < 0) {
						this.snakes[i].teleport(this.snakes[i].x, this.height);
					}
					for(var ii = 0; ii < this.numPlayers; ii++){
						if(this.snakes[ii].isInside(this.snakes[i].x
						,this.snakes[i].y, i==ii, this.snakes[i].radius)){
							this.snakes[i].kill();
							this.dead++;
						}
					}
					
				}
			}
			if(this.dead==this.numPlayers) {
				this.playing = false;
				console.log('add dead, game paused');
			}
		},
		render: function() {
			this.foreLayer.draw();
		},
		run: function(){
			var that = this;
			var now, dt = 0;
			var last = window.performance.now();
			var stepTime = 1000/this.FPS;
			function frame() {					
				now = window.performance.now();
				dt += (now - last);
				if(dt > stepTime){	
					while(dt > stepTime) {
						dt -= stepTime;
						that.step();
					}
					
					that.render();
					last = now;
				}
				if (that.playing) requestAnimationFrame(frame);
			}
			requestAnimationFrame(frame);
		}
    });
    return GameField;
});
