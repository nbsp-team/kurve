define([
    "app",
    'konva'
], function(app, Konva){
	function SnakePartArc(x, y, r, startAngle, radius, clockwise){ this.init(x, y, r, startAngle, radius, clockwise);}
    SnakePartArc.prototype = {
		
		init: function(x, y, r, startAngle, radius, clockwise) {
	        this.update(x, y, r, startAngle, startAngle, radius,clockwise);
		},
		update: function(x, y, r, angle, angle2, radius, clockwise){
		    this.r = r;
            this.x = x;
            this.y = y;

            this.angle2 = angle2;
            this.angle=angle;
            this.radius = radius;
            this.clockwise = clockwise;
            this.correct = (clockwise)?1.0/r:-1.0/r;
		},
		applyUpdate: function(arc){
		    this.update(arc.x, arc.y, arc.radius, arc.angle, arc.angle2, arc.lineRadius, arc.clockwise);

		},
		updateHead: function(angleV) {
			this.angle2 += angleV;
		},
		clear:function(ctx){

			ctx.clearRect(this.x - this.r - this.radius-1, this.y-this.r-this.radius-1
			, 2*(this.r+this.radius+1),2*(this.r+this.radius+1));

		},
		draw: function(ctx, col){			
			if (this.angle+this.correct === this.angle2) return;
			ctx.beginPath();
			ctx.strokeStyle = col;
			ctx.lineWidth = this.radius*2;			
			ctx.arc(this.x, this.y, this.r, this.angle+this.correct, this.angle2, this.clockwise);
			
			ctx.stroke();	
		}
    };

    return SnakePartArc;
});
