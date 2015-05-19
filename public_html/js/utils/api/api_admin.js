/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {

        // Private vars
        var ADMIN_SHUTDOWN_URL = '/api/v1/admin/shutdown';
        var ADMIN_STATUS_URL = '/api/v1/admin/status';

        return {
            shutdownServer: function(time) {
                var def = $.Deferred();
                var post = $.post(ADMIN_SHUTDOWN_URL, {time: time});

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
            },

            getStatus: function() {
                var def = $.Deferred();
                var req = $.get(ADMIN_STATUS_URL);

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
            }
        };
    })();
});


