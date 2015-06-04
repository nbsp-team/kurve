define([
    'utils/api/ws/api_room',
    'utils/api/ws/api_game',
    'app'
], function(roomApi, gameApi, app) {

    var wsApi = {

        WS_URL: 'ws://' + location.host + '/socket/',

        READY_CODE: 3,
        
        EVENT_CODE: 6,
        UPDATE_PATCH_CODE : 15,
        currentApi: null,

        startConnection: function() {
            var socket = new WebSocket(this.WS_URL);

            this.currentApi = roomApi;

            this.socket = socket;
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onclose = this.onError;
            
            this.currentApi.ws_api = this;
            this.socket.onmessage = this.currentApi.onMessage;
        },

		switchToGame: function(){
			this.currentApi = gameApi;
			this.socket.onmessage = this.currentApi.onMessage;
		},

        closeConnection: function() {
            this.socket.close();
        },

        onOpen: function() {

        },

        onClose: function(code) {

        },

        onError: function(error) {
            console.log("SOCKET ERROR: " + error.message);
        },

        //****************** Methods ******************//

        sendReady: function(readyStatus) {

            var data = {
                "code": this.READY_CODE,
                "ready": readyStatus
            };

            console.log(data);

            this.socket.send(JSON.stringify(data));
        },
        
        sendKeyEvent: function(isLeft, isUp){
			var data = { 'code' : this.EVENT_CODE, 'isLeft' : isLeft, 'isUp': isUp }
			
			this.socket.send(JSON.stringify(data));
		},

        sendRequestPatch: function(ids){
            var data = { 'code' : this.UPDATE_PATCH_CODE, 'ids' : ids};
            this.socket.send(JSON.stringify(data));
        }

        //****************** Methods ******************//
    };

    return wsApi;
});
