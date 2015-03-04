define([
    'app',
    'tmpl/scoreboard',
    'views/AbstractScreen',
    'collections/scores'
], function(
    app,
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
            this.listenToOnce(this.collection, 'add', this.render);
            this.listenToOnce(this.collection, 'add', this.show);
        },

        load: function() {
            this.collection.loadRating();
        }
    });

    return View;
});