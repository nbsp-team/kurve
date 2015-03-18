define([
    "app",
    "models/User"
], function(app, UserModel){

    var SessionModel = Backbone.Model.extend({
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
                    self.set("loggedIn", true);
                    self.updateSessionUser(userData);
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
