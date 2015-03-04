define([
    'app'
], function(
    app
){
    var Score = Backbone.Model.extend({
        defaults: {
            "username": "",
            "global_rating": 0
        }
    });

    return Score;
});

