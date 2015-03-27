define([
    'app',
    'tmpl/room',
    'views/AbstractScreen',
    'collections/Room',
    'views/components/room-player',
    'models/Player'
], function(
    app,
    tmpl,
    AbstractScreen,
    RoomCollection,
    RoomPlayer,
    Player
){

    var View = AbstractScreen.extend({

        el: '.js-room',
        playersContainer: null,
        template: tmpl,
        currentPlayer: null,

        events: {
            'click .js-back-button': 'goBack',
            'click .js-ready-button': 'setReady'
        },

        initialize: function () {
            this.collection = new RoomCollection();
            this.listenTo(this.collection, "add", this.addUser);
            this.listenToOnce(this.collection, "loggined", this.connected);
        },

        load: function() {
            this.renderAndShow();
            this.playersContainer = this.$el.children('.js-container-players');
            this.collection.connectToRoom();
        },

        addUser: function(userModel) {
            var playerView = new RoomPlayer({'model': userModel});
            this.playersContainer.append(playerView.el);

            if(userModel.get('username') == app.session.user.get('username')) {
                this.currentPlayer = userModel;
            }

            this.listenToOnce(playerView, "removeMe", this.removeUser);
        },

        removeUser: function(user) {
            user.remove();
        },

        goBack: function() {
            this.collection.disconnectFromRoom();
            app.router.navigateTo("/");
        },
        setReady: function() {

            var newReadyStatus = !this.currentPlayer.get("is_ready");

            this.collection.setReady(newReadyStatus);
            this.currentPlayer.set("is_ready", newReadyStatus);
        }
    });

    return View;
});
