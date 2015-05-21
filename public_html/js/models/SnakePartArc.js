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
            this._correct = (clockwise)?1.0/r:-1.0/r;
            this.correct = 0;
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
			if(this.correct === 0) {
				var span = this.angle2 - this.angle - this.correct;
				
				if((span > 0 && span < 0.1 && this.clockwise) 
				|| (span < 0 && span > -0.1 && !this.clockwise)){
						//
				} else {
					this.correct = this._correct;
				}
			}
			ctx.beginPath();
			ctx.strokeStyle = col;
			ctx.lineWidth = this.radius*2;			
			ctx.arc(this.x, this.y, this.r, this.angle+this.correct, this.angle2, this.clockwise);
			
			ctx.stroke();
		},
		normAngle: function(x) {
			while(x >= 2*Math.PI) x -= 2*Math.PI;
			while(x < 0) x += 2*Math.PI;
			return x;
		}
    };

    return SnakePartArc;
});
