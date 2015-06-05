define([
    'app',
    'models/GameScore'
], function(
    app,
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
            _.invoke(this.toArray(), 'destroy');
            this.reset();
            for(var i = 0; i < data.length; ++i) {
                this.add(new GameScore(data[i]));
            }
        }
    });

    return Collection;
});