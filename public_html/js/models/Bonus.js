define([
    
], function(
    
){
	function Bonus(options){this.initialize(options);}
    Bonus.prototype = {
		radius: 10,
		
        initialize: function(options) {
			this.color = options.color;
			this.x = options.x;
			this.y = options.y;
			this.ctx = options.ctx;
			this.id = options.id;
			//this.color = 'green';
			this.id = options.id;
		},
		clear: function(){
			this.ctx.clearRect(this.x - this.radius - 1, this.y - this.radius - 1
			, this.radius*2+2, this.radius*2+2);
		},
		draw: function(){
			this.ctx.beginPath();
			this.ctx.fillStyle = this.color;
			this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
			this.ctx.fill();
			
		}
		
    };
    
    return Bonus;
});
