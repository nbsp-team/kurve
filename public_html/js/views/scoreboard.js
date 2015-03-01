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

        initialize: function () {
            this.listenTo(this.collection, 'ratingLoad:ok', this.setCollection);
            //this.listenTo(this.collection, 'ratingLoad:error', this.);
        },

        render: function() {
            this.collection.loadRating();
        },

        setCollection: function() {
            $(this.el).html(this.template({'collection': this.collection}));
            this.show();
        }

    });

    return new View();
});