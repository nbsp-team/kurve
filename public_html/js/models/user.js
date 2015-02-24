define([
    'backbone',
    'utils/api_auth'
], function(
    Backbone,
    Api
){

    var User = Backbone.Model.extend({

        defaults: {
            "isLogin": false
        },

        register: function(username, email, password) {

            if(!username || !email || !password) {
                this.trigger("signup:error", "Некорректные данные");
                return;
            }

            var userObject = {
                "username": username,
                "email": email,
                "password": password
            };

            Api.signup(this, userObject);
        },

        connectionError: function() {
            this.trigger("signup:error", "Ошибка подключения");
        },

        signupResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response']['user'];

                this.set("isLogin", true);
                this.set("username", user['username']);
                this.set("email", user['email']);
                this.set("rating", user['global_rating']);

                this.trigger("signup:ok");

            } else {
                this.trigger("signup:error", data['message']);
            }
        },

        signinResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response']['user'];

                this.set("isLogin", true);
                this.set("username", user['username']);
                this.set("email", user['email']);
                this.set("rating", user['global_rating']);

                this.trigger("signup:ok");

            } else {
                this.trigger("signup:error", data['message']);
            }
        },

        login: function(username, password) {

            var userObject = {
                "username": username,
                "password": password
            };

            Api.signin(this, userObject);
        }

    });

    return new User();
});
