define([
], function(){

    var Room = Backbone.Model.extend({
        defaults: {
            "room_id": "",
            "creation_date": 0,
            "owner_user_id": "",
            capacity: 0,
            "players": []
        }
    });

    return Room;
});
