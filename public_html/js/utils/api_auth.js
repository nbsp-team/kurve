/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {

        var SIGNUP_URL = '/api/v1/auth/signup'; // Рега
        var SIGNIN_URL = '/api/v1/auth/signin'; // Авторизация

        return {
            signup: function(data) {
                var def = $.Deferred();
                var post = $.post(SIGNUP_URL, data);
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

            signin: function(data) {
                var def = $.Deferred();
                var post = $.post(SIGNIN_URL, data);
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
        }

    })();
});

