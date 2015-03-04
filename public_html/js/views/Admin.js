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

        el: '#admin',
        template: tmpl,
        templateArg: ServerStatus,
        model: ServerStatus,

        events: {
            'click #shutdown' : 'shutdownServer'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change', this.show);
        },

        load: function() {
            this.model.update();
        },

        shutdownServer: function() {
            this.model.shutdownServer();
        }
    });

    return View;
});