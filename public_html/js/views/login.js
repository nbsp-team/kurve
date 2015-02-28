define([
    'backbone',
    'syphon',
    'tmpl/login',
    'models/user'
], function(
    Backbone,
    Syphon,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#login',
        template: tmpl,
        model: User,

        events: {
            'submit #login-form' : 'login'
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
            var userData = Syphon.serialize(this);
            this.model.save(userData);
            return false;
        }
    });

    return new View();
});