define([
    'backbone',
    'notify',
    'tmpl/login'
], function(
    Backbone,
    Notify,
    tmpl
){

    var View = Backbone.View.extend({

        el: 'body',
        template: tmpl,

        events: {
            'click #login' : 'login'
        },

        input_login: '[type=login]',
        input_password: '[type=password]',

        login: function() {

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