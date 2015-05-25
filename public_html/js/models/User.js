define([
    'app'
], function(
    app
){

    var User = Backbone.Model.extend({
        defaults: {
            "user_id": "",
            "first_name": "",
            "last_name": "",
            "avatar": "",
            "global_rating": 0,
            "isLogin": false
        }
    });

    return User;
});