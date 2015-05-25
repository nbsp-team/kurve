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
        var SOCIAL_SIGNIN_URL = '/api/' + API_VERSION + '/auth/social'; // Авторизация
        var SIGNOUT_URL = '/api/' + API_VERSION + '/auth/signout'; // Авторизация
        var GET_USER_URL = '/api/' + API_VERSION + '/user/'; // Авторизация

        return {
            signUp: function(data) {
                var def = $.Deferred();
                
                var post = $.post(SIGNUP_URL, data);
                post.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response.user);
                    } else {
                        def.reject(data.error);
                    }
                });
                post.fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def;
            },

            signIn: function(data) {
                var def = $.Deferred();
                var post = $.post(SIGNIN_URL, data);
                post.done(function(data) {

                    if(data.error == null) {
                        def.resolve(data.response.user);
                    } else {
                        def.reject(data.error);
                    }
                });
                post.fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def;
            },

            socialSignIn: function(authProvider, sessionData) {
                var data = {
                    auth_provider: authProvider,
                    session: JSON.stringify(sessionData)
                };

                var def = $.Deferred();
                var post = $.post(SOCIAL_SIGNIN_URL, data);

                post.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response.user);
                    } else {
                        def.reject(data.error);
                    }
                });

                post.fail(function() {
                    def.reject("Ошибка подключения");
                });

                return def;
            },

            signOut: function() {
                var def = $.Deferred();
                var post = $.post(SIGNOUT_URL);
                post.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response);
                    } else {
                        def.reject(data.error);
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
                        def.resolve(data.response.user);
                    } else {
                        def.reject(data.error);
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

