define([
    'app'
], function(
    app
){
    var AbstractScreen = Backbone.View.extend({

        dispose: function() {
            this.hide();
        },

        render: function () {
            $(this.el).html(this.template(
                {
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
