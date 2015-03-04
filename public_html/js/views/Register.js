define([
    'app',
    'syphon',
    'tmpl/register',
    'views/AbstractScreen'
], function(
    app,
    Syphon,
    tmpl,
    Abstract
){

    var View = Abstract.extend({

        el: '#register',
        template: tmpl,

        passwordRepeatField: 'password_repeat',

        events: {
            'submit #reg-form': 'register'
        },

        initialize: function () {
            this.listenTo(app.session, "change:loggedIn", this.loggedChanged);
        },

        register: function () {
            var userData = Syphon.serialize(this);
            app.session.signup(userData);
            return false;
        },

        loggedChanged: function() {
            if (app.session.get("loggedIn")) {
                app.router.navigateTo("/");
            }
        }
    });

    return View;
});
