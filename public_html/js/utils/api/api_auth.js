/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {
        var API_VERSION = 'v1';
        var SIGNUP_URL = '/api/' + API_VERSION + '/auth/signup'; // Рега
        var SIGNIN_URL = '/api/' + API_VERSION + '/auth/signin'; // Авторизация
        var GET_USER_URL = '/api/' + API_VERSION + '/user/'; // Авторизация

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
            },

            getUser: function() {
                var def = $.Deferred();
                var post = $.get(GET_USER_URL);

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

