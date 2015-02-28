define([
    'jquery',
    'backbone',
    'utils/api_auth'
], function(
    $,
    Backbone,
    api
) {

    return function(method, model, options) {


        var methods = {

            'create': {

                send: function() {
                    // Не очень :(
                    model.get('email') ? this.register() : this.login();
                },

                login: function() {
                    api.signin(model.toJSON()).then(this.onSuccessCreate, this.onfail);
                },

                register: function() {
                    api.signup(model.toJSON()).then(this.onSuccessCreate, this.onfail);
                },

                onSuccessCreate: function(data) {

                    if(data.error === null) {
                        var user = data.response;
                        user.isLogin = true;
                        model.set(user);
                        model.trigger('login:ok');
                    } else {
                        model.trigger("login:error", data['error']['description']);
                        console.log(model);
                    }
                },

                onfail: function() {
                    console.log(model);
                }

            },

            'read': {

            },

            'update': {

            }
        };

        return methods[method].send();
    };
});
