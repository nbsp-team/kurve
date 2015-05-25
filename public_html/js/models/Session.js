define([
    "app",
    "models/User"
], function(app, UserModel){

    var SessionModel = Backbone.Model.extend({
        AUTH_PROVIDER_VK: 0,
        AUTH_PROVIDER_FB: 1,

        VK_OAUTH_URL: 'https://oauth.vk.com/authorize?client_id=4930885&scope=notify,friends&redirect_uri=http%3A%2F%2Fkurve.ml%2Fapi%2Fv1%2Fauth%2Fsocial%3Ftype%3D0&response_type=code',
        FB_OAUTH_URL: 'https://www.facebook.com/dialog/oauth?client_id=925250904206070&redirect_uri=http%3A%2F%2Fkurve.ml%2Fapi%2Fv1%2Fauth%2Fsocial%3Ftype%3D1&display=popup&scope=public_profile,user_friends',

        defaults: {
            loggedIn: false
        },

        initialize: function(){
            //_.bindAll(this, 'updateSessionUser');
            this.user = new UserModel({});
        },

        triggerLoggedUpdate: function() {
            this.trigger('change:loggedIn');
        },

        updateSessionUser: function(userData) {
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

        checkAuth: function(callback) {
            var self = this;
            app.api.auth.getUser().then(
                function(userData) {
                    self.updateSessionUser(userData);
                    self.set("loggedIn", true);
                    callback(true);
                },
                function(errorObject) {
                    self.set("loggedIn", false);
                    callback(false);
                }
            );
        },

        signup: function(userData) {
            var self = this;
            app.api.auth.signUp(userData).then(
                function(userData) {
                    self.updateSessionUser(userData);
                    self.set("loggedIn", true);
                },
                function(errorObject) {
                    app.notify.notify(errorObject.description, 'error');
                    self.set("loggedIn", false);
                }
            );
        },

        login: function(userData) {
            var self = this;
            app.api.auth.signIn(userData).then(
                function(userData) {
                    self.updateSessionUser(userData);
                    self.set("loggedIn", true);
                },
                function(errorObject) {
                    app.notify.notify(errorObject.description, 'error');
                    self.set("loggedIn", false);
                }
            );
        },

        socialLogin: function(authProvider, response) {
            if (response.status === 'connected') {
                var sessionData = {};

                switch (authProvider) {
                    case this.AUTH_PROVIDER_VK:
                        sessionData = response.session;
                        break;
                    case this.AUTH_PROVIDER_FB:
                        sessionData = response.authResponse;
                        break;
                }

                app.api.auth.socialSignIn(authProvider, sessionData).then(
                    function(userData) {
                        self.updateSessionUser(userData);
                        self.set("loggedIn", true);
                    },
                    function(errorObject) {
                        app.notify.notify(errorObject.description, 'error');
                        self.set("loggedIn", false);
                    }
                );
            } else {
                console.error("social auth: not authorized");
            }
        },

        logout: function() {
            var self = this;
            app.api.auth.signOut().then(
                function() {
                    self.set("loggedIn", false);
                },
                function(errorObject) {
                }
            );
        }
    });

    return SessionModel;
});
