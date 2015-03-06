define([
    'app'
], function(
    app
){

    var Player = Backbone.Model.extend({
        defaults: {
            "username": "",
            "email": "",
            "global_rating": 0,
            "rating": 0,
            "color": "#333333",
            "isReady": false
        }
    });

    return Player;
});
