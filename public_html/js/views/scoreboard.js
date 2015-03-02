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

    // Abstract.prototype.render.bind(this)();

    var View = Abstract.extend({

        el: '#rating',
        template: tmpl,
        collection: Collect,
        templateArg: Collect,

        initialize: function () {
            this.listenTo(this.collection, 'ratingLoad:ok', this.render);
            //this.listenTo(this.collection, 'ratingLoad:error', this.);
        },

        load: function() {
            this.collection.loadRating();
        }
    });

    return new View();
});