/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {

        var SIGNUP_URL = '/api/v1/auth/signup'; // Рега
        var SIGNIN_URL = '/api/v1/auth/signin'; // Авторизация
        var USER_URL_  = '/api/v1/user';

        return {
            signup: function(data) {
                return $.post(SIGNUP_URL, data);
            },

            signin: function(data) {
                return $.post(SIGNIN_URL, data);
            }
        }

    })();

});

