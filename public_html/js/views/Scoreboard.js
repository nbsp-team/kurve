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
            this.listenTo(this.collection, 'add', this.render);
        },

        load: function() {
            this.collection.loadRating();
        }
    });

    return View;
});