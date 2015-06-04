define([
], function(){
    var Score = Backbone.Model.extend({
        defaults: {
            "user_id": "",
            "first_name": "",
            "last_name": "",
            "avatar": "",
            "global_rating": 0
        }
    });

    return Score;
});