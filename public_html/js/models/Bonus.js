define([
    'utils/BonusUtils'
], function(
    BonusUtils
){
	function Bonus(options){this.initialize(options);}
    Bonus.prototype = {
        initialize: function(options) {
			this.x = options.x;
			this.y = options.y;
			this.ctx = options.ctx;
			this.id = options.id;
			this.kind = options.kind;
		},
		clear: function(){
            this.ctx.clearRect(
                this.x - BonusUtils.BONUS_WIDTH / 2 - 1,
                this.y - BonusUtils.BONUS_HEIGHT / 2 - 1,
                BonusUtils.BONUS_WIDTH + 2,
                BonusUtils.BONUS_HEIGHT + 2);
		},
		draw: function(){
			this.ctx.drawImage.apply(this.ctx,
                BonusUtils.getBonusImageArgs(this.kind, this.x, this.y));

		},
		onEat: function(field, eater_id, queue){
			switch(this.kind){
				case BonusUtils.ERASE_SELF:
					var snakes = field.snakes;
					queue.push(function() {
							field.backCtx.clearRect(0,0,field.width, field.height);
							field.foreCtx.clearRect(0,0,field.width, field.height);
							snakes[eater_id].eraseSelf();

							for(var i = 0; i < snakes.length; i++){
								if(i != eater_id) snakes[i].drawAll();
							}
						}
					);
					break;
				case BonusUtils.REVERSE_ENEMY:
                    var snakes = field.snakes;
                    queue.push( function(){

                            for(var i = 0; i < snakes.length; i++){
                                if(i != eater_id) snakes[i].reverse();
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
