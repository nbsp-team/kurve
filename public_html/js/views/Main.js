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

        el: '.b-menu',
        template: tmpl,
        templateArg: User,

        /* ================= Events ================= */

        events: {
            'click .js-logout': 'logoutEvent'
        },

        logoutEvent: function() {
            app.session.logout();
        }

        /* ================= Events ================= */
    });

    return View;
});