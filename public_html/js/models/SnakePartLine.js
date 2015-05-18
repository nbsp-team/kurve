define([
    "app"
], function(app){
	function SnakePartLine(x1, y1, x2, y2, radius){ this.init(x1, y1, x2,y2, radius);}
    SnakePartLine.prototype = {
		init: function(x1, y1, x2, y2, radius) {
		    this.update(x1,y1,x2,y2,radius);

		},
		update: function(x1, y1, x2, y2, radius){
		    this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2;
		    this.radius = radius;
		    this.d = Math.sqrt((this.x1-this.x2)*(this.x1-this.x2)+(this.y1-this.y2)*(this.y1-this.y2));
            if(this.d > 0){
                this.correctx = (this.x1-this.x2)/this.d;
                this.correcty = (this.y1-this.y2)/this.d;
            } else {
                this.correctx = 0;
                this.correcty = 0;
            }
            //this.C = (-this.x1*this.A - this.B*this.y1);
		},
		applyUpdate: function(line){
			//if (line.y1 < 0) line.y1 = 1;
			//if( line.y2 >= 600) line.y2 = 599;
			this.update(line.x1, line.y1, line.x2, line.y2, line.lineRadius);

		},
		updateHead: function(newX, newY, v) {
			this.x2 = newX;
			this.y2 = newY;
			//this.d += v;
		},
		isInside______Old: function(x, y, radius) {
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
			ctx.moveTo(this.x1+this.correctx, this.y1+this.correcty);
			ctx.lineTo(this.x2, this.y2);
			ctx.strokeStyle = col;
			ctx.stroke();
		}
    };
	
    return SnakePartLine;
});
