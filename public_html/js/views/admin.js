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
        },

        load: function() {
            this.model.update();
        },

        shutdownServer: function() {
            this.model.shutdownServer();
        }
    });

    return new View();
});