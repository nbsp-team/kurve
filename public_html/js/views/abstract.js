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
            this.trigger('loading:finish');
            $(this.el).html(this.template({'arg': this.templateArg}));
            this.show();
        },

        load: function() {
            this.render();
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
