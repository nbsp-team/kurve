define([
    'app',
    'tmpl/room',
    'views/AbstractScreen',
    'collections/Room'
], function(
    app,
    tmpl,
    AbstractScreen,
    RoomCollection
){

    var View = AbstractScreen.extend({

        el: '.js-room',
        template: tmpl,

        initialize: function () {
            this.collection = new RoomCollection();
        },

        load: function() {
            this.collection.connectToRoom();
        }
    });

    return View;
});
