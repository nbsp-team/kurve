define([
    'backbone',
    'tmpl/main',
    'models/user',
    'models/alertManager',
    'views/abstract'
], function(
    Backbone,
    tmpl,
    User,
    AlertManager,
    Abstract
){
    var View = Abstract.extend({

        el: '#menu',
        template: tmpl,
        model: User,
        templateArg: User,

        /* ================= Events ================= */

        events: {
            'click #logout': 'logoutEvent'
        },

        logoutEvent: function() {
            this.model.logout();
        }

        /* ================= Events ================= */
    });

    return new View();
});