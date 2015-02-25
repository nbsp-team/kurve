define([
    'backbone',
    'tmpl/login',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#login',
        template: tmpl,
        model: User,

        events: {
            'click #login' : 'login'
        },

        input_login: '[type=login]',
        input_password: '[type=password]',

        initialize: function () {},

        render: function () {
            $(this.el).html(this.template({'user': this.model}));
            this.show();
        },

        dispose: function() {
            this.hide();
        },

        show: function() {
            $(this.el).show();
        },

        hide: function() {
            $(this.el).hide();
        },

        login: function() {
            this.model.login($(this.input_login).val(),
                $(this.input_password).val());
        }
    });

    return new View();
});