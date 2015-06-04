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
            this.listenTo(app.wsEvents, "player_ready", this.onPlayerReady);
            this.listenTo(app.wsEvents, "connected", this.onConnectToRoom);
            this.listenTo(app.wsEvents, "start_game_event", this.onStartGame);
        },

        onStartGame: function() {
            Api.switchToGame();
        },

        connectToRoom: function() {
            Api.startConnection();
        },

        disconnectFromRoom: function() {
            Api.closeConnection();
            _.invoke(this.toArray(), 'destroy');
        },

        onConnectToRoom: function(usersData) {
            _.invoke(this.toArray(), 'destroy');
            this.reset();
            for(var i = 0; i < usersData.length; ++i) {
                this.add(new Player(usersData[i]));
            }
        },

        onNewUserConnected: function(userData) {
            this.add(new Player(userData));
        },

        onUserDisconnected: function(userData) {
            this.remove(this.where({"player_id": userData.player_id}));
        },

        onPlayerReady: function(playerId, readyStatus) {
            var player = this.where({"player_id": playerId});
            player[0].set("is_ready", readyStatus);
        },

        setReady: function(readyStatus) {
            Api.sendReady(readyStatus);
        }
    });

    Collection.prototype.add = function(truck) {
        var isDupe = this.any(function(_truck) {
            return _truck.get('user_id') === truck.get('user_id');
        });

        return isDupe ? false : Backbone.Collection.prototype.add.call(this, truck);
    };

    return Collection;
});
