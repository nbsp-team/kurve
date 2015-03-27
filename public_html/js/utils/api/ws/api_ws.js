define([
    'utils/api/ws/api_room'
], function(roomApi) {

    var wsApi = {

        WS_URL: 'ws://' + location.host + '/',

        READY_CODE: 3,

        currentApi: null,

        startConnection: function() {
            var socket = new WebSocket(this.WS_URL);

            this.currentApi = roomApi;

            this.socket = socket;
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onmessage = this.currentApi.onMessage;
        },

        closeConnection: function() {
            this.socket.close();
        },

        onOpen: function() {

        },

        onClose: function() {

        },

        startGame: function() {

        },

        //****************** Methods ******************//

        sendReady: function(readyStatus) {

            var data = {
                "code": this.READY_CODE,
                "ready": readyStatus
            };

            console.log(data);

            this.socket.send(JSON.stringify(data));
        }

        //****************** Methods ******************//
    };

    return wsApi;
});



