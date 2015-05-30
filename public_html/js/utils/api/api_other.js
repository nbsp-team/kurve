/**
 * Created by Dimorinny on 23.02.15.
 */

define([
    'jquery'
], function($) {

    return (function() {

        var LOAD_CONTROLLER_URL = '/api/v1/mobile/get';

        return {
            loadControllerUrl: function() {
                var def = $.Deferred();
                var get = $.get(LOAD_CONTROLLER_URL);

                get.done(function(data) {
                    if(data.error == null) {
                        def.resolve(data.response.mobile_url);
                    } else {
                        def.reject(data.error.description);
                    }
                });

                get.fail(function() {
                    def.reject("Ошибка подключения");
                });

                return def;
            }
        }
    })();
});
