define([
    'app'
], function(
    app
){

    var ServerStatus = Backbone.Model.extend({

        defaults: {
            "userCount": 0,
            "sessionCount": 0
        },

        update: function() {
            app.api.admin.getStatus().then(
                this.statusLoaded.bind(this),
                this.getStatusError.bind(this)
            );
        },

        shutdownServer: function() {
            app.api.admin.shutdownServer(5000).then(
                this.shutdownServerSuccess.bind(this),
                this.shutdownServerError.bind(this)
            );
        },

        shutdownServerSuccess: function() {
            app.notify.notify("Сервер выключиться через 5 секунд", "success");
        },

        shutdownServerError: function() {},


        statusLoaded: function(data) {
            this.set(data);
        },

        getStatusError: function() {}

    });

    return new ServerStatus();
});
