define([
    'backbone',
    'utils/api/api_auth'
], function(
    Backbone,
    Api
){

    var User = Backbone.Model.extend({

        defaults: {
            "username": "",
            "email": "",
            "global_rating": 0,
            "isLogin": false
        },

        register: function(userObject) {
            Api.signup(userObject).then(
                this.loginHandler.bind(this),
                this.errorHandler.bind(this)
            );
        },

        login: function(userObject) {
            Api.signin(userObject).then(
                this.loginHandler.bind(this),
                this.errorHandler.bind(this)
            );
        },

        checkAuth: function() {
            Api.getUser().then(
                this.checkAuthhandler.bind(this),
                this.errorHandler.bind(this)
            );
        },

        errorHandler: function(message) {
            this.trigger("login:error", message);
        },

        checkAuthhandler: function(data) {
            this.set(data);
            this.set('isLogin', true);
            this.trigger("login:ok");
        },

        loginHandler: function(data) {
            this.set(data);
            this.set('isLogin', true);
            this.trigger("login:ok");
            this.trigger("redirect:home");
        },

        logout: function() {
            this.clear()
                .set(this.defaults);
            this.trigger("logout");
        }
    });

    return new User();
});
