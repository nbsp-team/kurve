define([
    'app',
    'tmpl/room',
    'views/AbstractScreen',
    'collections/Room',
    'views/components/room-player'
], function(
    app,
    tmpl,
    AbstractScreen,
    RoomCollection,
    RoomPlayer
){

    var View = AbstractScreen.extend({

        el: '.js-room',
        playersContainer: null,
        template: tmpl,

        events: {
            'click .js-back-button': 'goBack'
        },

        initialize: function () {
            this.collection = new RoomCollection();
            this.listenTo(this.collection, "add", this.addUser);
        },

        load: function() {
            this.renderAndShow();
            this.playersContainer = this.$el.children('.js-container-players');
            this.collection.connectToRoom();
        },

        addUser: function(UserModel) {
            var playerView = new RoomPlayer({'model': UserModel});
            this.playersContainer.append(playerView.el.innerHTML);
            this.listenToOnce(playerView, "removeMe", this.removeUser);
        },

        removeUser: function(user) {
            user.remove();
        },

        goBack: function() {
            this.collection.disconnectFromRoom();
            app.router.navigateTo("/");
        }
    });

    return View;
});
