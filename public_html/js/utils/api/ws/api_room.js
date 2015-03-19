define([
    'app'
], function(app) {

    return (function() {

        var CONNECTED_CODE = 0;

        return {
            onMessage: function(message) {
                var messageObject = JSON.parse(message.data);
                console.log(messageObject);

                switch(messageObject.code) {
                    case CONNECTED_CODE:
                        app.wsEvents.trigger("connected", messageObject.players);
                        break;
                }
            }
        };
    })()

});



