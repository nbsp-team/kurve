define([
    'app',
    'utils/api/api_auth'
], function(
    app,
    Api
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
