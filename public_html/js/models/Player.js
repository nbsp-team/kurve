define([
    "app"
], function(app){

    var Player = Backbone.Model.extend({
        defaults: {
            "user_id": "",
            "first_name": "",
            "last_name": "",
            "avatar": "",
            "global_rating": 0,
            "rating": 0,
            "color": "#333333",
            "is_ready": false
        }
    });

    return Player;
});
