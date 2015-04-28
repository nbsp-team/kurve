define([
    'app'
], function(
    app
) {

    return function(method, model, options) {

        var methods = {

            'read': {
                send: function() {
                    // Тут в зависимости от данных может быть что-то другое.
                    this.loadData();
                },

                loadData: function() {
                    app.api.rating.loadRating().then(
                        this.successLoadingHandler,
                        this.errorLoadingHandler
                    );
                },

                successLoadingHandler: function(data) {
                    model.set(data);
                },

                errorLoadingHandler: function(message) {
                    model.trigger('ratingLoad:error', message);
                }
            },
            'create': {},
            'update': {},
            'delete': {}
        };

        return methods[method].send();
    };
});
