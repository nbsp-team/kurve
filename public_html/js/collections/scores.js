define([
    'backbone',
    'models/score',
    'utils/api_rating'
], function(
    Backbone,
    Score,
    Rating_api
){
    var Collection = Backbone.Collection.extend({
        model: Score,

        comparator: function(score) {
            return -score.get('global_rating');
        },

        initialize: function() {
        },

        loadRating: function() {
            Rating_api.loadRating().then(
                this.successLoadingHandler.bind(this),
                this.errorLoadingHandler.bind(this)
            );
        },

        successLoadingHandler: function(data) {
            this.set(data);
            this.trigger('ratingLoad:ok');
        },

        errorLoadingHandler: function(message) {
            this.trigger('ratingLoad:error', message);
        }
    });

    return new Collection();
});