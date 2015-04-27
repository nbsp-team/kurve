define([
    'app'
], function(
    app
) {

    return function(method, model, options) {

        var methods = {

            'create': {

                send: function() {
                    this.register();
                },

                register: function() {
                    console.log(model);

                    app.api.auth.signUp(userData).then(
                        function(userData) {
                            model.updateSessionUser(userData);
                            model.set("loggedIn", true);
                        },
                        function(errorObject) {
                            app.notify.notify(errorObject.description, 'error');
                            model.set("loggedIn", false);
                        }
                    );
                }
            },

            'read': {

                send: function() {

                },


                check: function() {

                }
            },

            'update': {

                send: function() {

                },

                login: function() {

                },

                logout: function() {

                }
            }
        };

        return methods[method].send();
    };
});
