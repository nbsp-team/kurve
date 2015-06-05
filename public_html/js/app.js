define([
        "jquery",
        "underscore",
        "backbone",
        "utils/api/api_admin",
        "utils/api/api_auth",
        "utils/api/api_rating",
        "utils/api/api_other",
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
        FormStorage
    ) {
        var app = {
            "api": {
                "auth": ApiAuth,
                "admin": ApiAdmin,
                "rating": ApiRating,
                "other": ApiOther
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