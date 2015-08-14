define([
        "jquery",
        "underscore",
        "backbone",
        "utils/api/api_admin",
        "utils/api/api_auth",
        "utils/api/api_rating",
        "utils/api/api_other",
        "utils/api/api_room",
        "utils/storage/form_storage"
    ],
    function(
        $,
        _,
        Backbone,
        ApiAdmin,
        ApiAuth,
        ApiRating,
        ApiOther,
        ApiRoom,
        FormStorage
    ) {
        var app = {
            "api": {
                "auth": ApiAuth,
                "admin": ApiAdmin,
                "rating": ApiRating,
                "other": ApiOther,
                "room": ApiRoom
            },

            "storage": {
                "loginStorage": new FormStorage("login"),
                "registerStorage": new FormStorage("register")
            },

            "config": {
                "domain": "127.0.0.1:9081"
            }
        };

        app.wsEvents = new _.extend({}, Backbone.Events);

        return app;
    });