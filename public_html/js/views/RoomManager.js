define([
    'app',
    'tmpl/room-manager',
    'views/AbstractScreen',
    'collections/Scores',
    'collections/RoomList'
], function(
    app,
    tmpl,
    Abstract,
    Scores,
    RoomList
){

    var View = Abstract.extend({

        el: '.js-room-manager',
        template: tmpl,
        collection: new RoomList(),
        templateArg: null,

        events: {
            'click .js-create-public-room' : 'createPublicRoom'
        },

        initialize: function () {
            this.templateArg = this.collection;
            this.listenTo(this.collection, 'rooms_load:ok', this.onLoad);
            this.listenTo(this.collection, 'room_create:ok', this.load);
            this.load();
        },

        createPublicRoom: function() {
            this.collection.createRoom("public");
        },

        onLoad: function() {
            this.renderAndShow();
        },

        load: function() {
            this.collection.fetch();
            console.log(this.collection);
        }
    });

    return View;
});