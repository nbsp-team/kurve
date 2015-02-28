define([
    'backbone',
    'syphon',
    'tmpl/register',
    'models/user'
], function(
    Backbone,
    Syphon,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#register',
        template: tmpl,
        model: User,

        events: {
            'submit #reg-form' : 'register'
        },

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
            var userData = Syphon.serialize(this);
            this.model.save(userData);
            return false;
        }
    });

    return new View();
});