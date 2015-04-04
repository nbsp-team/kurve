define([
    "app"
], function(app){

    var Player = Backbone.Model.extend({
        defaults: {
            "player_id": 0,
            "username": "",
            "email": "",
            "global_rating": 0,
            "rating": 0,
            "color": "#333333",
            "is_ready": false
        }
    });

    return Player;
});