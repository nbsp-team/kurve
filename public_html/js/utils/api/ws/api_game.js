define([
    'app'
], function(app) {

    return (function() {

        var KEY_EVENT_CODE = 7;
        var GAME_OVER_CODE = 12;
		var GAME_START_CODE = 13;
		var SNAKE_UPDATE_CODE = 14;
		var NEW_BONUS_CODE = 9;
		var EAT_BONUS_CODE = 10;
		var SNAKE_PATCH_CODE = 16;
		//var dbg = 0;
        return {
            onMessage: function(message) {
                var msg = JSON.parse(message.data);
    			if(game_log) console.log(msg);

                switch(msg.code){
					case KEY_EVENT_CODE: {
						 console.log(msg);
						app.wsEvents.trigger("wsKeyEvent", msg.isLeft, msg.isUp, msg.sender);
						break;
					}
					case SNAKE_UPDATE_CODE:{
						//dbg++;
						//if(dbg !=3)
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
				}
            }
        };
    })()

});



