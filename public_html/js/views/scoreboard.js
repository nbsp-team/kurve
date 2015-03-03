define([
    'backbone',
    'tmpl/scoreboard',
    'views/abstract',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    Abstract,
    Collect
){

    var View = Abstract.extend({

        el: '#rating',
        template: tmpl,
        collection: Collect,
        templateArg: Collect,

        initialize: function () {
            this.listenTo(this.collection, 'add', this.render);
        },

        load: function() {
            this.collection.loadRating();
        }
    });

    return new View();
});