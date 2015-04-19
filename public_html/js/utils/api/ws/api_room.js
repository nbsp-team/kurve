define([
    'app'
], function(app) {

    return (function() {

        var CONNECTED_CODE = 0;
        var PLAYER_CONNECTED_CODE = 1;
        var PLAYER_DISCONNECTED_CODE = 2;
        var PLAYER_READY_CODE = 4;
		var GAME_STARTED_CODE = 5;
		
		
        return {
            onMessage: function(){ 
				var that = this;
				return function(message) {
					var messageObject = JSON.parse(message.data);
					console.log(messageObject);

					switch(messageObject.code) {
						case CONNECTED_CODE:
							app.wsEvents.trigger("connected", messageObject.players);
							break;

						case PLAYER_CONNECTED_CODE:
							app.wsEvents.trigger("player_connected", messageObject.player);
							break;

						case PLAYER_DISCONNECTED_CODE:
							app.wsEvents.trigger("player_disconnected", messageObject.player);
							break;

						case PLAYER_READY_CODE:
							app.wsEvents.trigger("player_ready", messageObject.player_id,
								messageObject.ready);
							break;
						case GAME_STARTED_CODE:
							that.ws_api.switchToGame();
							var options = messageObject;
							options.colors = [];
							options.numPlayers = messageObject.players.length;
							for(var i = 0; i < messageObject.players.length; i++){
								options.colors.push(messageObject.players[i].color);
							}
							app.wsEvents.trigger("wsStartGame", options);
							
							
							break;    
					}
				}
			}
        };
    })()

});
