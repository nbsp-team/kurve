define([
    'app',
    'models/Player',
    'utils/api/ws/api_ws'
], function(
    app,
    Player,
    Api
){
    var Collection = Backbone.Collection.extend({
        model: Player,

        comparator: function(score) {
            return -score.get('rating');
        },

        initialize: function () {
            this.listenTo(app.wsEvents, "player_connected", this.onNewUserConnected);
            this.listenTo(app.wsEvents, "player_disconnected", this.onUserDisconnected);
            this.listenToOnce(app.wsEvents, "connected", this.onConnectToRoom);
        },

        connectToRoom: function() {
            Api.startConnection();
        },

        disconnectFromRoom: function() {
            Api.closeConnection();
        },

        onConnectToRoom: function(usersData) {
            for(var i = 0; i < usersData.length; ++i) {
                this.add(new Player(usersData[i]));
            }
        },

        onNewUserConnected: function(userData) {
            this.add(new Player(userData));
        },

        onUserDisconnected: function(userData) {
            this.remove(this.where({"username": userData.username}));
        }
    });

    return Collection;
});
