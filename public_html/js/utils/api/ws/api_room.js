define([
    'app'
], function(app) {

    return (function() {

        var CONNECTED_CODE = 0;
        var PLAYER_CONNECTED_CODE = 1;
        var PLAYER_DISCONNECTED_CODE = 2;

        return {
            onMessage: function(message) {
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
                }
            }
        };
    })()

});



