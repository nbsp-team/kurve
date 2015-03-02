define([
    'backbone',
    'tmpl/main',
    'notify',
    'models/user',
    'models/session',
    'views/abstract'
], function(
    Backbone,
    tmpl,
    Notify,
    User,
    Session,
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
        },

        /* ================= Events ================= */

        initialize: function () {
            this.listenTo(this.model, 'login:ok', this.renderSignupOk);
            this.listenTo(this.model, 'login:error', this.renderSignupError);
        },

        renderSignupOk: function(message) {
            $.notify("Готово", {
                position: 'bottom',
                className: 'success'
            });
        },

        renderSignupError: function(message) {
            $.notify(message, {
                position: 'bottom',
                className: 'error'
            });
        }
    });

    return new View();
});