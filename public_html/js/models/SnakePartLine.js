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
			
			
		},
		updateHead: function(newX, newY, v) {
			this.x2 = newX;
			this.y2 = newY;
			this.d += v;
			
			//console.log(this.line);
		},
		isInside: function(x, y, radius) {
			var bx = x-this.x1;
			var by = this.y1-y;
			var proj = this.B*bx+this.A*by;

			if(!(proj>-radius && proj <this.d)) return false;

			return Math.abs(this.A*x+this.B*y+this.C) < this.radius + radius;
		},
		clear:function(ctx){
			var x1 = Math.min(this.x2, this.x1)-this.radius-1;
			var y1 = Math.min(this.y2, this.y1)-this.radius-1;
			var x2 = Math.max(this.x2, this.x1)+this.radius+1;
			var y2 = Math.max(this.y2, this.y1)+this.radius+1;
			ctx.clearRect(x1, y1, x2-x1, y2-y1);
		},
		draw: function(ctx, col){
			ctx.beginPath();
			
			ctx.lineWidth = this.radius*2;	
			ctx.moveTo(this.x1, this.y1);
			ctx.lineTo(this.x2, this.y2);
			ctx.strokeStyle = col;
			ctx.stroke();
		}
    };
	
    return SnakePartLine;
});
