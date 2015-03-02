define([
    'backbone'
], function(
    Backbone
){

    var View = Backbone.View.extend({

        el: '#preloader',

        show: function() {
            $(this.el).show();
        },

        hide: function() {
            $(this.el).hide();
        }
    });

    return new View();
});
