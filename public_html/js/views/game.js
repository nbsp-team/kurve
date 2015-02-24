define([
    'backbone',
    'tmpl/game',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#game',
        template: tmpl,
        model: User,

        initialize: function () {
            // TODO
        },

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
        }
    });

    return new View();
});