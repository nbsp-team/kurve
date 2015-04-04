define([
    'app'
], function(
    app
){

    var User = Backbone.Model.extend({
        defaults: {
            "username": "",
            "email": "",
            "global_rating": 0,
            "isLogin": false
        }
    });

    return User;
});