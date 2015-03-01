define([
    'backbone'
], function(
    Backbone
){
    var Score = Backbone.Model.extend({
        defaults: {
            "username": "",
            "global_rating": 0
        }
    });

    return Score;
});

