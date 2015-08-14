define([
    'jquery'
], function($) {

    return (function() {

        var GET_ROOMS_URL = '/api/v1/rooms/';
        var CREATE_ROOM_URL = '/api/v1/rooms/create';

        return {
            getRooms: function() {
                var def = $.Deferred();
                var req = $.get(GET_ROOMS_URL);

                req.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response);
                    } else {
                        def.reject(data.error.description);
                    }
                });

                req.fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def;
            },

            // type - private or public
            createRoom: function(type) {
                var def = $.Deferred();
                var post = $.post(CREATE_ROOM_URL, {type: type});

                post.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response);
                    } else {
                        def.reject(data.error.description);
                    }
                });

                post.fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def;
            }
        };
    })();
});


