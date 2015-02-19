define([
    'backbone',
    'tmpl/game'
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
        }

    });

    return new View();
});