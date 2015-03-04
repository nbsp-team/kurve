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

        load: function() {
            this.render();
            this.show();
        },

        render: function () {
            $(this.el).html(this.template({'model': this.templateArg}));
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