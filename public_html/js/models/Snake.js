

define([
    "app",
    "konva",
    "models/SnakePartLine",
    "models/SnakePartArc"
], function(app, Konva, SnakePartLine, SnakePartArc){
	function Snake(){this.initialize();}
    Snake.prototype = {
		defaultSpeed: 120, 
		defaultAngleSpeed: 100,
		defaultPartLength: 100,
		defaultHoleLength: 20,
		defaultRadius: 4,
		init: function(x, y, angle, color, FPS, backLayer, foreLayer) {
			this.backLayer = backLayer;
			this.layer = foreLayer;
			this.color = color;
			this.FPS=FPS;
			this.angleV = this.defaultAngleSpeed*2*Math.PI/180/FPS;
			this.v = this.defaultSpeed / FPS;
			this.angle = angle;
			this.vx = this.v * Math.cos(this.angle);
			this.vy = this.v * Math.sin(this.angle);
			this.arcRadius = this.v / this.angleV;
			this.partStopper = (this.defaultPartLength / this.v);
			this.holeStopper = ((this.defaultPartLength + this.defaultHoleLength) / this.v);
			this.x = x;	this.y = y;
			
			this.cosV = Math.cos(this.angleV);
			this.sinV = Math.sin(this.angleV);
			this.nextArcToDraw = 0;
			this.nextLineToDraw = 0;
			
			
			var that = this;
			this.head = new Konva.Rect({
                x: that.x, y: that.y,
                width: 10, height: 10,
                fill: 'red', stroke: 'black',
                strokeWidth: 4,
                offset : {x : 5, y : 5}
            });
            this.layer.add(this.head);
            this.head.x(x); this.head.y(y);
            this.doLine();
		},
		kill: function() {
			this.isAlive = false;
			console.log(this.color + ' x_x');
		},
        initialize: function (){
			
			this.c = 0;
			this.drawing = true;
			this.isAlive = true;
			this.TURNING_LEFT = 0;
			this.TURNING_RIGHT = 1;
			this.NOT_TURNING = 2;
			
			this.turning = this.NOT_TURNING;
			
			this.snakeArcs = [];
			this.snakeLines = [];
			this.narcs = 0;
			this.nlines = 0;
			
			this.alive = true;
			this.radius = this.defaultRadius;
			this.stepCounter = 0;
		},
		startTurning: function(where) {
	        this.turning = where;  
			this.doArc();			
		},
		stopTurning: function(where) {
			if(this.turning==where) {
				this.turning = this.NOT_TURNING;
				this.vx = this.v*Math.cos(this.angle);
				this.vy = this.v*Math.sin(this.angle);
				this.doLine();
			}
		},
		doArc: function(){
			if(this.turning == this.TURNING_LEFT){
				this.arcStartAngle = this.angle + Math.PI/2;
				var clockwise = true;
				this.arcCenterX = this.x + this.arcRadius*Math.sin(this.angle);
				this.arcCenterY = this.y - this.arcRadius*Math.cos(this.angle);
			} else {
				this.arcStartAngle = this.angle - Math.PI/2;
				var clockwise = false;
				this.arcCenterX = this.x - this.arcRadius*Math.sin(this.angle);
				this.arcCenterY = this.y + this.arcRadius*Math.cos(this.angle);
			}
			this.arcAngle = this.arcStartAngle;
			
			if(!this.drawing) return;
			
			var newArc = new SnakePartArc();
			newArc.init(this.arcCenterX, this.arcCenterY
			  , this.arcRadius, this.arcStartAngle, this.color
			  , this.radius, clockwise, this.layer);

			if(this.narcs>0){
				this.snakeArcs[this.narcs-1].arc.moveTo(this.backLayer);
				this.backLayer.draw();
			}
			this.snakeArcs.push(newArc);
			this.narcs++;
		},
		doLine: function() {
	        if(!this.drawing) return;
			var newLine = new SnakePartLine();
			newLine.init(this.x, this.y, this.vx, this.vy, this.radius, this.color, this.layer);
			if(this.nlines>0){
				this.snakeLines[this.nlines-1].line.moveTo(this.backLayer);
				this.backLayer.draw();
			}
			this.snakeLines.push(newLine);
			this.nlines++;
		},
		changeRadius: function(radius) {
			this.radius = radius;
			if(this.drawing) {
				if(this.turning == this.NOT_TURNING) {
					this.doLine();
				} else {
					this.doArc();
				}
			}
		},
		isInside: function(x, y, itself, radius) {
			var lim = this.nlines;
			if(itself && this.turning == this.NOT_TURNING) lim--;
			for(var i = 0; i < lim; i++){
				if(this.snakeLines[i].isInside(x, y, radius)) return true;
			}
			var lim = this.narcs;
			if(itself && this.turning != this.NOT_TURNING) lim--;
			for(var i = 0; i < lim; i++){
				if(this.snakeArcs[i].isInside(x, y, radius)) return true;
			}
			return false;
		},
		step: function() {
			
			this.c++;
			if(this.c == 3*this.FPS) {
				this.changeRadius(10);
			}
			if(this.c == 7*this.FPS) this.changeRadius(this.defaultRadius);
			this.makeHoles();
			if(this.turning == this.NOT_TURNING) {
				this.x += this.vx;
				this.y += this.vy;
				if(this.drawing) this.lastLine().updateHead(this.x, this.y, this.v);
			} else {
				var dx = (this.x-this.arcCenterX);
				var dy = (this.y-this.arcCenterY);
				if (this.turning == this.TURNING_LEFT) {
					this.angle -= this.angleV;
					this.y = this.arcCenterY + dy*this.cosV - dx*this.sinV;
					this.x = this.arcCenterX + dy*this.sinV + dx*this.cosV;
					if(this.drawing) this.lastArc().updateHead(-this.angleV);
				} else {
					this.angle += this.angleV;
					this.y = this.arcCenterY + dy*this.cosV + dx*this.sinV;
					this.x = this.arcCenterX - dy*this.sinV + dx*this.cosV;
					if(this.drawing) this.lastArc().updateHead(this.angleV);
				}
				
			}
			this.head.x(this.x);
			this.head.y(this.y);
		},
		makeHoles: function() {
			if(this.stepCounter > this.partStopper){
				this.drawing = false;
				if(this.stepCounter == this.holeStopper) {
					this.stepCounter = 0;
					this.drawing = true;
					if(this.turning == this.NOT_TURNING) {
						this.doLine();
					} else {
						this.doArc();
					}
				}
			}
			this.stepCounter++;
		},
		lastLine: function() {
			return this.snakeLines[this.nlines-1];
		},
		lastArc: function() {
			return this.snakeArcs[this.narcs-1];
		},
		
		teleport: function(newX, newY) {
			this.x = newX;	this.y = newY;
			if(this.turning == this.NOT_TURNING) {
				this.doLine();
			} else {
				this.doArc();
			}
		}
		
    };
    
    return Snake;
});



