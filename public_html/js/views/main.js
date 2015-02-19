define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

        el: 'body',
        template: tmpl,

        initialize: function () {
            // TODO
        },
        render: function () {
            $(this.el).html(this.template());
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});