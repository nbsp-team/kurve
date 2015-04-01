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
			
			this.span = 0;
			this.radius = radius;
			this.clockwise = clockwise;
			
			var that = this;
			this.correct = (clockwise)?2.0/r:-2.0/r;
			
			this.angle = startAngle;
			
		},
		cache:function(){
			
		},
		normAngle: function(x) {
			//return x;
			while(x >= 2*Math.PI) x-=2*Math.PI;
			while(x < 0) x += 2*Math.PI;
			return x;
		},
		updateHead: function(angleV) {
			this.span += angleV;
		},
		isInside: function(x, y, radius){
			var d = Math.sqrt((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y));
			if(Math.abs(d-this.r)>this.radius + radius) return false;
			var alpha = Math.atan2((y-this.y),(x-this.x));

			var b = ((alpha<this.angle) != (alpha< this.angle + this.span));
			if(b){
				console.log(this.r);
				console.log(d);
				console.log(x);
				console.log(y);
				console.log(this.normAngle(this.angle)	);
				console.log(this.normAngle(this.angle + this.span));
				console.log(alpha);
				return true;
			}
		},
		clear:function(ctx){
			ctx.clearRect(this.x - this.r - this.radius-1, this.y-this.r-this.radius-1
			, 2*(this.r+this.radius+1),2*(this.r+this.radius+1));
		},
		draw: function(ctx, col){
			
			
			ctx.beginPath();
			ctx.strokeStyle = col;
			ctx.lineWidth = this.radius*2;
			
			if(this.span>0){
				ctx.arc(this.x, this.y, this.r, this.normAngle(this.angle+this.correct), this.normAngle(this.angle+this.span));
				
			} else {
				ctx.arc(this.x, this.y, this.r, this.normAngle(this.angle+this.correct ), this.normAngle(this.angle+this.span), true);
			}
			
			ctx.stroke();	
		}
    };

    return SnakePartArc;
});
