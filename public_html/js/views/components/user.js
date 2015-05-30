define([
    'app',
    'tmpl/components/user'
], function(
    app,
    tmpl
){
    var View = Backbone.View.extend({

        el: '.b-user',
        template: tmpl,

        initialize: function () {
            this.listenTo(app.session, 'change:loggedIn', this.update);
        },

        events: {
            'click .js-toolbar-exit': 'logoutEvent',
            'click .js-toolbar-controller': 'showQrPopup'
        },

        showQrPopup: function() {
            app.qrPopup.showPopup();
        },

        logoutEvent: function() {
            app.session.logout();
        },

        show: function() {
            $(this.el).fadeIn();
        },

        hide: function() {
            $(this.el).fadeOut();
        },

        update: function() {
            if (!app.session.get('loggedIn')) {
                this.hide();
            } else {
                this.render();
                this.show();
            }
        },

        render: function () {
            console.log(app.session.user.toJSON());
            $(this.el).html(this.template(
                {
                    'app': app,
                    'user': app.session.user.toJSON()
                }
            ));
        }
    });

    return View;
});
