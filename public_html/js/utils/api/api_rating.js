/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {

        // Private vars
        var LOAD_RATING_URL = '/api/v1/rating/';

        return {
            loadRating: function() {
                var def = $.Deferred();
                var post = $.get(LOAD_RATING_URL);
                post.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response.rating);
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


