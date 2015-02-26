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
                    userModel.signupResponse(data);
                });

                post.fail(function() {
                    userModel.connectionError();
                });
                /*var dfd = $.Deferred();

                $.post().done(function(data) {
                    //do some actoin with data
                    var newData = {};
                    dfd.resolve(newData);
                    dfd.reject(newData);
                })

                return dfd;*/
            },

            signin: function(userModel, data) {
                var post = $.post(SIGNIN_URL, data);

                post.done(function(data) {
                    userModel.signinResponse(data);
                });

                post.fail(function() {
                    userModel.connectionError();
                });
            }
        }

    })();

});

