define([
    'app',
    'models/Snake',
    'utils/api/ws/api_ws',
    'models/Bonus'
], function(
    app,
    Snake,
    Api,
    Bonus
){
	function GameField(options){this.initialize(options);}
    GameField.prototype = {
		FPS : 60,
		width : 500,
		height : 300,
        initialize: function(options) {
			this.numPlayers = options.numPlayers;
			this.myId = options.myId;
			
			if(options.width) this.width = options.width;
			if(options.height) this.height = options.height;
			if(options.FPS) this.FPS = options.FPS;
			if(options.speed) Snake.prototype.defaultSpeed = options.speed;
			if(options.angleSpeed) Snake.prototype.defaultAngleSpeed = options.angleSpeed;
			
			if(options.holeLength) Snake.prototype.holeLength = options.holeLength;
			
			this.snakes = [];
			var mindim = Math.min(this.width, this.height);
			for(var i = 0; i < this.numPlayers; i++) {
				this.snakes[i] = new Snake();				
				var angle = i*2*Math.PI/this.numPlayers;
				var x = this.width/2 + mindim*0.25*Math.cos(angle);
                var y = this.height/2 + mindim*0.25*Math.sin(angle);
                
				this.snakes[i].init(x, y, angle+Math.PI/2, options.players[i].color, this.FPS, this.backCtx, this.foreCtx);
			}
			this.deadCount = 0;
			this.playing = true;
			
			this.makeCanvas(options.canvasBox);
			this.bonuses = [];
		},
		snakeUpdate: function(snake){
			this.snakes[snake.id].update(snake);
		},
		makeCanvas:function(box) {
			this.backCanvas = document.createElement('canvas');
			this.backCanvas.id     = "background-canvas";
			this.backCanvas.width  = this.width; this.backCanvas.height = this.height;
			this.backCanvas.style.zIndex   = 1;
			this.foreCanvas = document.createElement('canvas');
			this.foreCanvas.id     = "foreground-canvas";
			this.foreCanvas.width  = this.width; this.foreCanvas.height = this.height;
			this.foreCanvas.style.zIndex   = 2;
			this.backCanvas.style.position = "absolute"; this.foreCanvas.style.position = "absolute";
			
			
			box.append(this.backCanvas); box.append(this.foreCanvas);
			box.width(this.width); box.height(this.height);
			box.css({left:-this.width/2});
			
			this.backCtx = this.backCanvas.getContext('2d');
			this.foreCtx = this.foreCanvas.getContext('2d');
			for(var i = 0; i < this.numPlayers; i++){
				this.snakes[i].foreCtx = this.foreCtx;
				this.snakes[i].backCtx = this.backCtx;
			}
		},
		onNewBonus: function(bonus){
			var options = bonus;
			options.ctx = this.foreCtx;
			this.bonuses.push(new Bonus(options));
		},
		onEatBonus: function(id){
			
			var i = 0;
			while(i < this.bonuses.length && this.bonuses[i].id != id) i++;
			if(i==this.bonuses.length) return;
			//this.bonuses[i].clear();
			for(; i < this.bonuses.length-1; i++){
				this.bonuses[i] = this.bonuses[i+1];
			}
			this.bonuses.length--;
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
		pause: function(){
			this.playing = !this.playing;
			console.log(this.snakes[0]);
		},
        step: function () {
			this.steps++;
			for(var i = 0; i < this.numPlayers; i++) {
				if(this.snakes[i].isAlive) {
					this.snakes[i].step();
					if(this.snakes[i].x > this.width)  this.snakes[i].teleport(0, this.snakes[i].y);
					if(this.snakes[i].x < 0)           this.snakes[i].teleport(this.width, this.snakes[i].y);
					if(this.snakes[i].y > this.height) this.snakes[i].teleport(this.snakes[i].x, 0);
					if(this.snakes[i].y < 0)           this.snakes[i].teleport(this.snakes[i].x, this.height);		
				}
			}
			if(this.deadCount===this.numPlayers) {
				this.playing = false;
				console.log('all deadCount, game paused');				
			}
			if(game_log) console.log('step');
		},
		onGameOver: function(){
			Api.closeConnection();
			this.pause();
		},
		render: function() {
			for(var i = 0; i < this.numPlayers; i++) this.snakes[i].clear();
			for(var i = 0; i < this.numPlayers; i++) this.snakes[i].draw();
			for(var j = 0; j < this.bonuses.length; j++) this.bonuses[j].clear();
			for(var i = 0; i < this.bonuses.length; i++) this.bonuses[i].draw();
		},
		run: function(){
			var that = this;
			var now, dt = 0;
			var last = window.performance.now();
			var stepTime = 1000/this.FPS;
			function frame() {					
				now = window.performance.now();
				dt += Math.min(1000, now - last);
				
				if(dt > stepTime){	
					while(dt > stepTime) {
						dt -= stepTime;
						that.step();
					}
					
					that.render();
					
				}
				last = now;
				if (that.playing) requestAnimationFrame(frame);
			}
			requestAnimationFrame(frame);
		}
    };
    
    return GameField;
});