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

        register: function(userObject) {
            Api.signup(this, userObject);
        },

        login: function(userObject) {
            Api.signin(this, userObject);
        },

        connectionError: function() {
            this.trigger("login:error", "Ошибка подключения");
        },

        signupResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response'];

                this.set("isLogin", true);
                this.set("name", user['username']);
                this.set("email", user['email']);
                this.set("score", user['global_rating']);

                this.trigger("login:ok");

            } else {
                this.trigger("login:error", data['error']['description']);
            }
        },

        signinResponse: function(data) {
            if(data['error'] === null) {
                var user = data['response'];

                this.set("isLogin", true);
                this.set("name", user['username']);
                this.set("email", user['email']);
                this.set("score", user['global_rating']);

                this.trigger("login:ok");

            } else {
                this.trigger("login:error", data['error']['description']);
            }
        },

        logout: function() {
            this.clear()
                .set(this.defaults);

            this.trigger("logout");
        }
    });

    return new User();
});
