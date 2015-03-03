define([
    'backbone',
    'utils/api/api_admin'
], function(
    Backbone,
    Api
){

    var ServerStatus = Backbone.Model.extend({

        defaults: {
            "userCount": 0,
            "sessionCount": 0
        },

        update: function() {
            Api.getStatus().then(
                this.statusLoaded.bind(this),
                this.getStatusError.bind(this)
            );
        },

        statusLoaded: function(data) {
            this.set(data);
        },

        getStatusError: function() {
            console.error("Fetching server status error")
        }
    });

    return new ServerStatus();
});
