define([
    "app",
    "models/Snake"
], function(app, Snake){

    var Bonus = Backbone.Model.extend({
		WIDE: 0,
		SLOW: 1,
        init: function(x, y, kind) {
			this.kind = kind;
			this.x = x;
			this.y = y;
		},
		draw: function(ctx){
			ctx.fillStyle = 'orange';
			ctx.fillRect(this.x-7, this.y-7, 14, 14);
		},
		use: function(snake) {
			switch(this.kind){
				case WIDE:
					snake.setRadius(10);
					break;
			}
		}
    });

    return Bonus;
});
