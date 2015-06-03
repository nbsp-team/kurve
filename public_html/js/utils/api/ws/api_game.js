define([
    'app'
], function(app) {

    return (function() {

        var KEY_EVENT_CODE = 7;
        var GAME_OVER_CODE = 12;
		var NEW_ROUND_START = 17;
		var SNAKE_UPDATE_CODE = 14;
		var NEW_BONUS_CODE = 9;
		var EAT_BONUS_CODE = 10;
		var SNAKE_PATCH_CODE = 16;
        var RATING_UPDATE_CODE = 17;

        return {
            onMessage: function(message) {
                var msg = JSON.parse(message.data);
    			console.log(msg);

                switch(msg.code){
					case KEY_EVENT_CODE: {
						app.wsEvents.trigger("wsKeyEvent", msg.isLeft, msg.isUp, msg.sender);
						break;
					}
					case SNAKE_UPDATE_CODE:{
						app.wsEvents.trigger("wsOnUpdateEvent", msg);
						break;
					} 
					case GAME_OVER_CODE:{
						console.log(msg.results);
						app.wsEvents.trigger("wsGameOverEvent", msg);
						break;
					} 
					case NEW_BONUS_CODE:{
						app.wsEvents.trigger("wsNewBonus", msg.bonus);
						break;
					}
					case EAT_BONUS_CODE:{
						app.wsEvents.trigger("wsEatBonus", msg);
						break;
					}
					case SNAKE_PATCH_CODE:{
						app.wsEvents.trigger("wsOnPatchEvent", msg.updates);
						break;
					}
                    case NEW_ROUND_START: {
                        var options = msg;

                        options.colors = [];
                        options.numPlayers = msg.players.length;
                        for(var i = 0; i < msg.players.length; i++){
                            options.colors.push(msg.players[i].color);
                        }

                        app.wsEvents.trigger("new_round_event", options);
                        break;
                    }

                    case RATING_UPDATE_CODE: {
                        app.wsEvents.trigger("rating_update", msg.rating);
                        console.log(msg.rating);
                    }
				}
            }
        };
    })()

});



