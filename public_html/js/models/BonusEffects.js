define([
    'utils/BonusUtils'
], function(
    BonusUtils
){
	function BonusEffects(ctx, snake, FPS){this.initialize(ctx, snake, FPS);}
    BonusEffects.prototype = {
        effects: [],
        radius0: 15,
        span: 5,
        width: 2,
        tempEffects: [],
        addEffect: function(bonus){
            var effect = {
                angleV: 2*Math.PI/BonusUtils.timeOutOf(bonus)/this.FPS,
                angle: 2*Math.PI,
                color: BonusUtils.colorOf(bonus)
            };
            this.effects.push(effect);
            this.clearRadius = this.radius0 + this.span*this.effects.length + 1;
        },
        initialize: function(ctx, snake, FPS) {
            console.log(ctx);
			this.ctx = ctx;
			this.snake = snake;
			this.effects = [];
			this.FPS = FPS;
		},
		clear: function() {
		    if(this.effects.length === 0) return;
            this.ctx.clearRect(
                this.clearX,
                this.clearY,
                2*this.clearRadius,
                2*this.clearRadius);
		},
		draw: function() {
		    if(this.effects.length === 0) return;
		    this.ctx.beginPath();

		    for(var i = 0; i < this.effects.length; i++) {
                this.ctx.beginPath();
                this.ctx.lineWidth = this.width;
                var effect = this.effects[i];
                this.ctx.strokeStyle = effect.color;
                this.ctx.arc(this.snake.x, this.snake.y, this.radius0 + this.span*i, 0, effect.angle);
                this.ctx.stroke();
            }
            this.clearX = this.snake.x - this.clearRadius;
            this.clearY = this.snake.y - this.clearRadius;
            this.clearRadius = this.radius0 + this.span*this.effects.length + 1;
		},
		done: function() {
			return false;
		},
		tick: function(){
            for(var i = this.effects.length - 1; i >= 0; i--) {
                this.effects[i].angle -= this.effects[i].angleV;
                if(this.effects[i].angle < 0) this.effects.splice(i, 1);
            }

		}
    };
    
    return BonusEffects;
});
