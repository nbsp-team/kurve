define([
        "jquery",
        "underscore",
        "backbone",
        "utils/api/api_admin",
        "utils/api/api_auth",
        "utils/api/api_rating"
    ],
    function(
        $,
        _,
        Backbone,
        ApiAdmin,
        ApiAuth,
        ApiRating
    ) {
        var app = {
            "api": {
                "auth": ApiAuth,
                "admin": ApiAdmin,
                "rating": ApiRating
            }
        };

        return app;
    });