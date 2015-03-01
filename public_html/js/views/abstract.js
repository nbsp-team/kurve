define([
    'backbone'
], function(
    Backbone
){
    var AbstractView = Backbone.View.extend({

        dispose: function() {
            this.hide();
        },

        render: function () {
            $(this.el).html(this.template({'model': this.model}));
            this.show();
        },

        show: function () {
            $(this.el).show();
        },

        hide: function () {
            $(this.el).hide();
        }
    });

    return AbstractView;
});
