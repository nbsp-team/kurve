define([
    "app",
    'konva'
], function(app, Konva){

    var SnakePartArc = Backbone.Model.extend({
		init: function(_x, _y, _r, startAngle, color, radius, clockwise, layer) {
	        this.r = _r;
			this.x = _x;
			this.y = _y;
			this.angle = startAngle;
			this.span = 0;
			this.radius = radius;
			this.clockwise = clockwise;
			
			var that = this;
			
			this.arc = new Konva.Arc({
			  innerRadius: that.r - that.radius,
			  outerRadius: that.r + that.radius,
			  fill: color,
			  angle: 0,
			  rotationDeg: startAngle*180/Math.PI,
			  x : _x,
			  y : _y,
			  clockwise : clockwise,
			  perfectDrawEnabled : false,
			  listening: false
			  //transformsEnabled : {'position', 'rotation'}
			  
			});
			
			layer.add(this.arc);
			
		},
		cache:function(){
			return;
			var that = this;
			this.arc.cache({
				x: that.x,
				y:that.y,
				width:that.r*2,
				height:that.r*2,
				drawBorder:true
			});
		},
		normAngle: function(x) {
			//return x;
			while(x >= 2*Math.PI) x-=2*Math.PI;
			while(x < 0) x += 2*Math.PI;
			return x;
		},
		updateHead: function(angleV) {
			this.span += angleV;
			this.arc.angle(this.span*180/Math.PI);
			//console.log(this.arc);
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
		draw: function(ctx){
			ctx.beginPath();
			ctx.lineWidth = this.radius*2;
			
			if(this.span>0){
				ctx.arc(this.x, this.y, this.r, this.normAngle(this.angle), this.normAngle(this.angle+this.span));
				
			} else {
				ctx.arc(this.x, this.y, this.r, this.normAngle(this.angle), this.normAngle(this.angle+this.span), true);
			}
			
			ctx.stroke();	
		}
    });

    return SnakePartArc;
});
