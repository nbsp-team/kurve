define([
        "jquery",
        "underscore",
        "backbone",
        "utils/api/api_admin",
        "utils/api/api_auth",
        "utils/api/api_rating",
        "utils/storage/form_storage"
    ],
    function(
        $,
        _,
        Backbone,
        ApiAdmin,
        ApiAuth,
        ApiRating,
        FormStorage
    ) {
        var app = {
            "api": {
                "auth": ApiAuth,
                "admin": ApiAdmin,
                "rating": ApiRating
            },

            "storage": {
                "loginStorage": new FormStorage("login"),
                "registerStorage": new FormStorage("register")
            }
        };

        return app;
    });