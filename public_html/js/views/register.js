define([
    'backbone',
    'tmpl/register',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#register',
        template: tmpl,
        model: User,

        events: {
            'click #register' : 'register'
        },

        input_username: '[type=username]',
        input_email: '[type=email]',
        input_password: '[type=password]',

        initialize: function () {},

        dispose: function() {
            this.hide();
            this.stopListening();
        },

        render: function () {
            $(this.el).html(this.template({'user': this.model}));
            this.show();
        },

        show: function() {
            $(this.el).show();
        },

        hide: function() {
            $(this.el).hide();
        },

        register: function() {
            this.model.register($(this.input_username).val(),
                $(this.input_email).val(),
                $(this.input_username).val());
        }
    });

    return new View();
});