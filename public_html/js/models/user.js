define([
    'backbone',
    'utils/api_auth'
], function(
    Backbone,
    Api
){

    var User = Backbone.Model.extend({

        defaults: {
            "name": "",
            "email": "",
            "score": 0,
            "isLogin": false
        },

        register: function(username, email, password) {

            if(!username || !email || !password) {
                this.trigger("login:error", "Некорректные данные");
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
            this.trigger("login:error", "Ошибка подключения");
        },

        signupResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response']['user'];

                this.set("isLogin", true);
                this.set("name", user['username']);
                this.set("email", user['email']);
                this.set("score", user['global_rating']);

                this.trigger("login:ok");

            } else {
                this.trigger("login:error", data['message']);
            }
        },

        signinResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response']['user'];

                this.set("isLogin", true);
                this.set("name", user['username']);
                this.set("email", user['email']);
                this.set("score", user['global_rating']);

                this.trigger("login:ok");

            } else {
                this.trigger("login:error", data['message']);
            }
        },

        login: function(username, password) {

            var userObject = {
                "username": username,
                "password": password
            };

            Api.signin(this, userObject);
        },

        logout: function() {
            this.clear()
                .set(this.defaults);

            console.log(this);

            this.trigger("logout");
        }

    });

    return new User();
});
