define([
    'app',
    'tmpl/game',
    '../models/User'
], function(
    app,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: '#game',
        template: tmpl,
        model: User,
        templateArg: User,

        initialize: function () {
            // TODO
        },

        render: function () {
            $(this.el).html(this.template({'model': this.model}));
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

    return View;
});