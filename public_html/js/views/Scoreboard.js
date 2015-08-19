define([
    'app',
    'tmpl/scoreboard',
    'views/AbstractScreen',
    'collections/Scores',
    'collections/RoomList'
], function(
    app,
    tmpl,
    Abstract,
    Scores,
    RoomList
){

    var View = Abstract.extend({

        el: '.js-rating',
        template: tmpl,
        collection: new Scores(),
        templateArg: null,

        initialize: function () {
            this.templateArg = this.collection;
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