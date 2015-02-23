define([
    'backbone',
    'notify',
    'tmpl/register',
    'models/user',
    'router'
], function(
    Backbone,
    Notify,
    tmpl,
    User,
    Router
){

    var View = Backbone.View.extend({

        el: 'body',
        template: tmpl,
        model: User,

        events: {
            'click #register' : 'register'
        },

        input_username: '[type=username]',
        input_email: '[type=email]',
        input_password: '[type=password]',

        register: function() {
            User.register($(this.input_username).val(),
                $(this.input_email).val(),
                $(this.input_username).val());
        },

        initialize: function () {
            this.listenTo(this.model, 'signup:ok', this.renderSignupOk);
            this.listenTo(this.model, 'signup:error', this.renderSignupError);
        },

        renderSignupOk: function(message) {
            $.notify("Готово", {
                position: 'bottom',
                className: 'success'
            });
        },

        renderSignupError: function(message) {
            $.notify(message, {
                position: 'bottom',
                className: 'error'
            });
        },

        render: function () {
            $(this.el).html(this.template());
        }
    });

    return new View();
});