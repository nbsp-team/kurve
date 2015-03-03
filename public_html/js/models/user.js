define([
    'backbone',
    'utils/api/api_auth',
    'models/redirectManager',
    'models/alertManager'
], function(
    Backbone,
    Api,
    Redirector,
    Alerter
){

    var User = Backbone.Model.extend({

        defaults: {
            "username": "",
            "email": "",
            "global_rating": 0,
            "isLogin": false
        },

        userOkMessage: "Все хорошо",

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

        /*
        checkAuth: function() {
            Api.getUser().then(
                this.checkAuthhandler.bind(this),
                this.errorHandler.bind(this)
            );
        },
        */

        errorHandler: function(message) {
            Alerter.alert(message, 'error');
        },

        /*
        checkAuthhandler: function(data) {
            this.set(data);
            this.set('isLogin', true);
            this.trigger("login:ok");
        },
        */

        loginHandler: function(data) {
            this.set(data);
            this.set('isLogin', true);

            Alerter.alert(this.userOkMessage, "success");
            Redirector.redirectTo('/');
            this.trigger('login:ok');
        },

        logout: function() {
            this.clear()
                .set(this.defaults);

            this.trigger("logout");
        }
    });

    return new User();
});
