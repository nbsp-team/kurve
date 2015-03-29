define([
    "app",
    'konva'
], function(app, Konva){
	function SnakePartLine(){}
    SnakePartLine.prototype = {
		init: function(x, y, vx, vy, radius, color, layer) {
	        this.x1 = x-vx;
			this.y1 = y-vy;
			this.d = Math.sqrt(vx*vx+vy*vy);
			this.A = -vy/this.d;
			this.B = vx/this.d;
			this.d = 0;
			this.C = (-this.x1*this.A - this.B*this.y1);
			this.d = 0;
			this.radius = radius;
			
			var that = this;
			this.line = new Konva.Line({
			  points: [that.x1, that.y1, that.x1, that.y1],
			  stroke: 'red',
			  tension: 1,
			  stroke: color,
			  strokeWidth: that.radius*2,
			  transformsEnabled : '',
			  listening: false
			});
			layer.add(this.line);
		},
		updateHead: function(newX, newY, v) {
			this.x2 = newX;
			this.y2 = newY;
			this.d += v;
			this.line.points([this.x1, this.y1, this.x2, this.y2]);
			
			//console.log(this.line);
		},
		isInside: function(x, y, radius) {
			var bx = x-this.x1;
			var by = this.y1-y;
			var proj = this.B*bx+this.A*by;

			if(!(proj>-radius && proj <this.d)) return false;

			return Math.abs(this.A*x+this.B*y+this.C) < this.radius + radius;
		},
		draw: function(ctx){
			console.log('log');
			ctx.beginPath();
			ctx.lineWidth = this.radius*2;	
			ctx.moveTo(this.x1, this.y1);
			ctx.lineTo(this.x2, this.y2);
			ctx.closePath();
			ctx.stroke();
		}
    };
	
    return SnakePartLine;
});
