define([
    'backbone',
    'tmpl/admin',
    'views/abstract'
], function(
    Backbone,
    tmpl,
    Abstract
){

    var View = Abstract.extend({

        el: '#admin',
        template: tmpl,

        initialize: function () {
            //this.listenTo(this.collection, 'ratingLoad:error', this.);
        },

        load: function() {

        }
    });

    return new View();
});