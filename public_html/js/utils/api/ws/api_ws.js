define([
    'utils/api/ws/api_room'
], function(roomApi) {

    var wsApi = {

        WS_URL: 'ws://127.0.0.1:8080/',

        currentApi: null,

        startConnection: function() {
            var socket = new WebSocket(this.WS_URL);

            this.currentApi = roomApi;

            this.roomSocket = socket;
            this.roomSocket.onopen = this.onOpen;
            this.roomSocket.onclose = this.onClose;
            this.roomSocket.onmessage = this.currentApi.onMessage;
        },

        closeConnection: function() {
            this.roomSocket.close();
        },

        onOpen: function() {

        },

        onClose: function() {

        },

        startGame: function() {

        }
    };

    return wsApi;
});



