define([
    'app'
], function(
    app
){
    var AbstractScreen = Backbone.View.extend({

        loginRequire: false,

        dispose: function() {
            this.hide();
        },

        load: function() {
            this.renderAndShow();
        },

        renderAndShow: function() {
            this.render();
            this.show();
        },

        render: function () {

            this.$el.html(this.template({
                    'app': app,
                    'arg': this.templateArg
                }
            ));
        },

        show: function () {
            $(this.el).show();
        },

        hide: function () {
            $(this.el).hide();
        }
    });

    return AbstractScreen;
});