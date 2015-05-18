define([
    
], function(
    
){
	function Bonus(options){this.initialize(options);}
    Bonus.prototype = {
		radius: 10,
		ERASE_SELF_KIND: 2,
		REVERSE_ENEMY_KIND: 13,
        initialize: function(options) {
			this.color = options.color;
			this.x = options.x;
			this.y = options.y;
			this.ctx = options.ctx;
			this.id = options.id;
			this.kind = options.kind;
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
			
		},
		onEat: function(field, eater_id, queue){
			switch(this.kind){
				case this.ERASE_SELF_KIND:
					var snakes = field.snakes;
					queue.push( function(){
							field.backCtx.clearRect(0,0,field.width, field.height);
							field.foreCtx.clearRect(0,0,field.width, field.height);
							snakes[eater_id].eraseSelf();

							//field.foreCtx.clearRect(0,0,field.width, field.height);
							for(var i = 0; i < snakes.length; i++){
								if(i != eater_id) snakes[i].drawAll();
							}
						}
					);
					break;
				case this.REVERSE_ENEMY_KIND:
                    var snakes = field.snakes;
                    queue.push( function(){

                            for(var i = 0; i < snakes.length; i++){
                                if(true || i != eater_id) snakes[i].reverse();
                            }
                            setTimeout(function(){
                                for(var i = 0; i < snakes.length; i++){
                                    if(true || i != eater_id) snakes[i].reverse();
                                }
                            },5000 );
                        }
                    );
                    break;
			}
		}
    };
    
    return Bonus;
});
