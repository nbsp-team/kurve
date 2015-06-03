define([
    'models/GameScore'
], function(
    GameScore
){
    var Collection = Backbone.Collection.extend({
        model: GameScore,

        comparator: function(score) {
            return -score.get('points');
        },

        initialize: function() {
            this.listenTo(app.wsEvents, "rating_update", this.onNewRating);
        },

        onNewRating: function(data) {

            this.set(data);
        }
    });

    return Collection;
});