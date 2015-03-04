define([
    'app',
    '../models/Score',
    'utils/api/api_rating'
], function(
    app,
    Score,
    Rating_api
){
    var Collection = Backbone.Collection.extend({
        model: Score,

        comparator: function(score) {
            return -score.get('global_rating');
        },

        loadRating: function() {
            Rating_api.loadRating().then(
                this.successLoadingHandler.bind(this),
                this.errorLoadingHandler.bind(this)
            );
        },

        successLoadingHandler: function(data) {
            this.set(data);
        },

        errorLoadingHandler: function(message) {
            this.trigger('ratingLoad:error', message);
        }
    });

    return new Collection();
});