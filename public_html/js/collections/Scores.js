define([
    'models/Score',
    'syncs/ScoresSync'
], function(
    Score,
    ScoresSync
){
    var Collection = Backbone.Collection.extend({
        model: Score,
        sync: ScoresSync,

        comparator: function(score) {
            return -score.get('global_rating');
        }
    });

    return new Collection();
});