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
            signup: function(userModel, data) {
                var post = $.post(SIGNUP_URL, data);

                post.done(function(data) {
                    userModel.signupResponse($.parseJSON(data));
                });

                post.fail(function() {
                    userModel.connectionError();
                })
            },

            signin: function(data, callback) {
                $.post(SIGNIN_URL, data, callback, callback);
            }
        }

    })();

});

