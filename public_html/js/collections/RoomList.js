define([
    'app',
    'models/Room',
    'syncs/RoomsSync'
], function(
    app,
    Room,
    RoomsSync
){
    var Collection = Backbone.Collection.extend({
        model: Room,
        sync: RoomsSync,

        initialize: function () {},

        createRoom: function(type) {
            app.api.room.createRoom(type).then(
                this.successLoadingHandler.bind(this),
                this.errorLoadingHandler.bind(this)
            );
        },

        successLoadingHandler: function(data) {
            console.log(this);
            this.trigger("room_create:ok");
        },

        errorLoadingHandler: function(message) {
            this.trigger('room_create:error', message);
        }
    });

    return Collection;
});