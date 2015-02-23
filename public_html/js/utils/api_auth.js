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
            signup: function(data, callback) {
                $.post(SIGNUP_URL, data, callback, callback);
            },

            signin: function(data, callback) {
                $.post(SIGNIN_URL, data, callback, callback);
            }
        }

    })();

});

