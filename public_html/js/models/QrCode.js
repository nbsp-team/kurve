define([
    'app'
], function(
    app
){

    var Qr = Backbone.Model.extend({

        defaults: {
            "url": ""
        },

        loadUrl: function() {
            app.api.other.loadControllerUrl().then(
                this.successLoadingHandler.bind(this),
                this.errorLoadingHandler.bind(this)
            );
        },

        successLoadingHandler: function(url) {
            this.set("url", url);
        },

        errorLoadingHandler: function(message) {

        }

    });

    return Qr;
});