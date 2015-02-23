define([
    'backbone',
    'utils/api'
], function(
    Backbone,
    Api
){

    var User = Backbone.Model.extend({

        defaults: {
            "isLogin": false
        },

        register: function(username, password) {

            var userObject = {
                "username": username,
                "password": password
            };

            Api.signup(userObject, function(data) {
               // TODO: register callback
            });
        },

        login: function(username, password) {

            var userObject = {
                "username": username,
                "password": password
            };

            Api.signin(userObject, function(data) {
                // TODO: login callback
            });
        }

    });

    return User;
});
