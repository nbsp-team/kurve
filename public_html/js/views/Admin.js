define([
    'app',
    'tmpl/admin',
    'views/AbstractScreen',
    'utils/api/api_admin',
    'models/ServerStatus'
], function(
    app,
    tmpl,
    AbstractScreen,
    Api,
    ServerStatus
){

    var View = AbstractScreen.extend({

        el: '.b-admin',
        template: tmpl,
        templateArg: ServerStatus,
        model: ServerStatus,

        events: {
            'click .js-shutdown' : 'shutdownServer'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.onLoad);
        },

        onLoad: function() {
            app.preloader.hide();
            this.renderAndShow();
        },

        load: function() {
            app.preloader.show();
            this.model.update();
        },

        shutdownServer: function() {
            this.model.shutdownServer();
        }
    });

    return View;
});