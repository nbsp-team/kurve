define([
    'app',
    'tmpl/scoreboard',
    'views/AbstractScreen',
    'collections/Scores'
], function(
    app,
    tmpl,
    Abstract,
    Collect
){

    var View = Abstract.extend({

        el: '.js-rating',
        template: tmpl,
        collection: Collect,
        templateArg: Collect,

        initialize: function () {
            this.listenTo(this.collection, 'scores_loaded', this.onLoad);
        },

        onLoad: function() {
            this.renderAndShow();
        },

        load: function() {
            this.collection.fetch();
        }
    });

    return View;
});