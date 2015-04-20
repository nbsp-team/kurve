define([
    "app",
    'konva'
], function(app, Konva){
	function SnakePartArc(){}
    SnakePartArc.prototype = {
		
		init: function(x, y, r, startAngle, color, radius, clockwise, layer) {
	        this.r = r;
			this.x = x;
			this.y = y;
			
			this.angle2 = startAngle;
			this.radius = radius;
			this.clockwise = clockwise;
			
			var that = this;
			this.correct = (clockwise)?2.0/r:-2.0/r;
			
			this.angle = startAngle;
			
		},		
		applyUpdate: function(arc){
			this.x = arc.x; this.y = arc.y;
			this.radius = arc.lineRadius;
			this.r = arc.radius; this.angle2 = arc.angle2;
			this.angle = arc.angle;
			this.clockwise = arc.clockwise;
			this.correct = (this.clockwise)?2.0/this.r:-2.0/this.r;
		},
		updateHead: function(angleV) {
			this.angle2 += angleV;
		},
		clear:function(ctx){
			ctx.clearRect(this.x - this.r - this.radius-1, this.y-this.r-this.radius-1
			, 2*(this.r+this.radius+1),2*(this.r+this.radius+1));
		},
		draw: function(ctx, col){			
			ctx.beginPath();
			ctx.strokeStyle = col;
			ctx.lineWidth = this.radius*2;			
			
			if(this.span>=0){
				ctx.arc(this.x, this.y, this.r, this.angle+this.correct, this.angle2+this.correct, this.clockwise);
			} else {
				ctx.arc(this.x, this.y, this.r, this.angle+this.correct, this.angle2+this.correct, this.clockwise);
			}
			
			ctx.stroke();	
		}
    };

    return SnakePartArc;
});
