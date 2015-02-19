define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

        el: 'body',
        template: tmpl,

        events: {
            'click .login' : 'login'
        },

        input_login: '[type=login]',
        input_password: '[type=password]',

        login: function() {
            alert("We try to login with: \n" +
                "Login: " + $(this.input_login).val() + "\n" +
                "Password: " + $(this.input_password).val()
            );
        },

        initialize: function () {
            // TODO
        },

        render: function () {
            $(this.el).html(this.template());
        }
    });

    return new View();
});