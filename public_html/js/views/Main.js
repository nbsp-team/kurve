define([
    'app',
    'tmpl/main',
    'models/User',
    'views/AbstractScreen'
], function(
    app,
    tmpl,
    User,
    Abstract
){
    var View = Abstract.extend({

        el: '#menu',
        template: tmpl,
        templateArg: User,

        initialize: function() {
            this.listenTo(app.session, "change:loggedIn", this.load);
        },

        /* ================= Events ================= */

        events: {
            'click #logout': 'logoutEvent'
        },

        logoutEvent: function() {
            app.session.logout();
        }

        /* ================= Events ================= */
    });

    return View;
});