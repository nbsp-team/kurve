define([
    'app'
], function(
    app
) {

    return function(method, collection, options) {

        var methods = {

            'read': {
                send: function() {
                    // Тут в зависимости от данных может быть что-то другое.
                    this.loadData();
                },

                loadData: function() {
                    console.log("start");
                    app.api.room.getRooms().then(
                        this.successLoadingHandler,
                        this.errorLoadingHandler
                    );
                },

                successLoadingHandler: function(data) {
                    collection.set(data.rooms);
                    collection.trigger("rooms_load:ok");
                },

                errorLoadingHandler: function(message) {
                    collection.trigger('rooms_load:error', message);
                }
            },
            'create': {},
            'update': {},
            'delete': {}
        };

        return methods[method].send();
    };
});
