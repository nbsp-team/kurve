define([
    'backbone',
    'utils/api_auth',
    'models/syncs/user'
], function(
    Backbone,
    Api,
    UserSync
){

    var User = Backbone.Model.extend({

        defaults: {
            "username": "",
            "email": "",
            "isLogin": false
        },

        sync: UserSync,

        logout: function() {
            this.clear()
                .set(this.defaults);

            this.trigger("logout");
        }
    });

    return new User();
});
