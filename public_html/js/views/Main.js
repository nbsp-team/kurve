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
        model: User,
        templateArg: User,

        initialize: function() {
            this.listenTo(app.session, "change:loggedIn", this.render);
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