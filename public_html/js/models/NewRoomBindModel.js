define([
], function(){

    var RoomBindModel = Backbone.Model.extend({
        defaults: {
            "name": "",
            "isPrivate": false
        }
    });

    return RoomBindModel;
});