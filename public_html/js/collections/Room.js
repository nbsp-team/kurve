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
            this.listenTo(app.wsEvents, "new_user_connected", this.onNewUserConnected);
            this.listenToOnce(app.wsEvents, "connected", this.onConnectToRoom);
        },

        connectToRoom: function() {
            Api.startConnection();
        },

        onConnectToRoom: function(usersData) {
            console.log(usersData);
        },

        onNewUserConnected: function(userData) {
            console.log(userData);
        }
    });

    return Collection;
});
