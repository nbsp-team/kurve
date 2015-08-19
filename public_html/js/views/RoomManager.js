define([
    'app',
    'tmpl/room-manager',
    'views/AbstractScreen',
    'views/components/create-room-dialog',
    'collections/Scores',
    'collections/RoomList'
], function(
    app,
    tmpl,
    Abstract,
    CreateRoomDialogView,
    Scores,
    RoomList
){

    var View = Abstract.extend({

        el: '.js-room-manager',
        template: tmpl,
        collection: new RoomList(),
        templateArg: null,
        createRoomDialogView: new CreateRoomDialogView(),

        events: {
            'click .js-create-room' : 'createRoom'
        },

        initialize: function () {
            this.templateArg = this.collection;
            this.listenTo(this.collection, 'rooms_load:ok', this.onLoad);
            this.listenTo(this.collection, 'room_create:ok', this.load);
            this.load();
        },

        createRoom: function() {
            this.createRoomDialogView.showPopup();
            //this.collection.createRoom("public");
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