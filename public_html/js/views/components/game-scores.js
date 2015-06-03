define([
    'app',
    'tmpl/components/game-scoreboard',
    'collections/GameScores'
], function(
    app,
    tmpl,
    ScoresCollection
){

    var View = Backbone.View.extend({

        template: tmpl,

        initialize: function () {
            this.collection = new ScoresCollection();
            this.templateArg = this.collection;
            this.el = '.js-ratings-container';

            this.listenTo(this.collection, 'add', this.render);
        },

        render: function() {
            console.log("render");
            $(this.el).html(this.template({
                    'app': app,
                    'arg': this.templateArg
                }
            ));
        }
    });

    return View;
});