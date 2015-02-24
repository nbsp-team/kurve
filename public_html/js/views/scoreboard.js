define([
    'backbone',
    'tmpl/scoreboard',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#rating',
        template: tmpl,

        initialize: function () {

        },

        dispose: function() {
            this.hide();
        },

        render: function () {
            $(this.el).html(this.template({'user': User}));
            this.show();
        },

        show: function() {
            $(this.el).show();
        },

        hide: function() {
            $(this.el).hide();
        }
    });

    return new View();
});