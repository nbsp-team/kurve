define([
    'backbone',
    'tmpl/admin',
    'views/abstract',
    'utils/api/api_admin',
    'models/serverStatus'
], function(
    Backbone,
    tmpl,
    Abstract,
    Api,
    ServerStatus
){

    var View = Abstract.extend({

        el: '#admin',
        template: tmpl,
        templateArg: ServerStatus,
        model: ServerStatus,

        events: {
            'click #shutdown' : 'shutdownServer'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            ServerStatus.update();
        },

        shutdownServer: function() {
            Api.shutdownServer(5000).then(
                this.shutdownSuccess.bind(this),
                this.shutdownError.bind(this)
            );
        },

        shutdownSuccess: function() {

        },

        shutdownError: function() {

        }
    });

    return new View();
});