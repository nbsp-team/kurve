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
	//function GameField(options){this.initialize(options);}
    var GameField = Backbone.Model.extend({
		FPS : 60,
		width : 1200,
		height : 600,
		timeOutLimSec: 10,
		timeOutLim: 10000,
        initialize: function(options) {

			this.listenTo(app.wsEvents, "wsSnakeUpdateEvent", this.snakeUpdate);
			this.listenTo(app.wsEvents, "wsNewBonus", this.onNewBonus);
			this.listenTo(app.wsEvents, "wsEatBonus", this.onEatBonus);
			
			this.numPlayers = options.numPlayers;
//			this.myId = options.myId;
			
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
			this.updatesQueue = [];
			this.controlsQueue = [];
			this.eatenBonusesQueue = [];
		},

        destruct: function() {
            this.stopListening(app.wsEvents, "wsSnakeUpdateEvent", this.snakeUpdate);
            this.stopListening(app.wsEvents, "wsNewBonus", this.onNewBonus);
            this.stopListening(app.wsEvents, "wsEatBonus", this.onEatBonus);

            this.playing = false;

            console.log(this.backCtx);
            console.log(this.foreCtx);

            this.backCtx.clearRect(0, 0, this.width, this.height);
            this.foreCtx.clearRect(0, 0, this.width, this.height);
        },
		snakeUpdate: function(snake){
			if(game_log) {
				console.log('applying update ');
				console.log(snake);			
			}
			this.lastUpdateTime = window.performance.now();
			this.updatesQueue.push(snake);
		},
		applyUpdates: function(){
			if(window.performance.now() - this.lastUpdateTime > this.timeOutLim) this.onTimeOut();
			while(this.updatesQueue.length > 0){
				var snake = this.updatesQueue.shift();
				this.snakes[snake.id].update(snake);
			}
		},
		applyBonuses: function(){
			while(this.eatenBonusesQueue.length > 0){
				this.eatenBonusesQueue.shift()();
			}
		},
		onTimeOut: function(){
			alert('server time out! (' + this.timeOutLimSec + ' seconds)');
			this.pause();
		},
		makeCanvas:function(box) {

            var backCanvas =  $('.js_b-canvas').get(0);
			backCanvas.width  = this.width;
            backCanvas.height = this.height;

			var foreCanvas = $('.js_f-canvas').get(0);
			foreCanvas.width  = this.width;
            foreCanvas.height = this.height;

            this.backCanvas = backCanvas;
            this.foreCanvas = foreCanvas;

			box.width(this.width);
            box.height(this.height);
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
			console.log('new');
			var bon = new Bonus(options);
			console.log(bon);
			console.log(this.bonuses);
			this.bonuses.push(bon);
			console.log(this.bonuses);
		},
		onEatBonus: function(msg){
			var id = msg.bonus_id;
			var i = 0;
			while(i < this.bonuses.length && this.bonuses[i].id != id) i++;
			
			if(i==this.bonuses.length) return;
			this.bonuses[i].clear();
			
			this.bonuses[i].onEat(this, msg.eater_id, this.eatenBonusesQueue);
			this.bonuses.splice(i, 1);
		},
		doControls: function(){
			while(this.controlsQueue.length > 0 ){
				var control = this.controlsQueue.shift();
				if(control.isUp) this.snakes[control.sender].stopTurning(control.where);
				else this.snakes[control.sender].startTurning(control.where);
			}
			//this.controlsQueue.length = 0;
		},
		leftDown: function(sender) {
			this.controlsQueue.push({isUp: false, sender : sender, where : Snake.prototype.TURNING_LEFT});			
		},
		leftUp: function(sender) { 
			this.controlsQueue.push({isUp: true, sender : sender, where : Snake.prototype.TURNING_LEFT});	
			//this.snakes[sender].stopTurning(this.snakes[sender].TURNING_LEFT);
		},
		rightDown: function(sender) {	
			this.controlsQueue.push({isUp: false, sender : sender, where : Snake.prototype.TURNING_RIGHT});					
			//this.snakes[sender].startTurning(this.snakes[sender].TURNING_RIGHT);
		},
		rightUp: function(sender) {	
			this.controlsQueue.push({isUp: true, sender : sender, where : Snake.prototype.TURNING_RIGHT});	
			//this.snakes[sender].stopTurning(this.snakes[sender].TURNING_RIGHT);	
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
				console.log('all dead, game paused');
			}
			if(game_log) console.log('step');
		},
		onGameOver: function(msg) {
            // TODO: Показать сообщение, с результатами и кнопками.
			Api.closeConnection();
			this.pause();
		},
		render: function() {
			for(var i = 0; i < this.numPlayers; i++) this.snakes[i].clear();
			for(var j = 0; j < this.bonuses.length; j++) this.bonuses[j].clear();
			for(var i = 0; i < this.bonuses.length; i++) this.bonuses[i].draw();
			for(var i = 0; i < this.numPlayers; i++) this.snakes[i].draw();			
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
					that.applyUpdates();
					that.applyBonuses();
					that.doControls();	
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
    });

    return GameField;
});
