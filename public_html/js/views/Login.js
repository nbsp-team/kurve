define([
    'app',
    'syphon',
    'tmpl/login',
    'views/AbstractScreen'
], function(
    app,
    Syphon,
    tmpl,
    AbstractScreen
){

    var View = AbstractScreen.extend({

        el: '#login',
        template: tmpl,

        initialize: function() {
            this.listenTo(app.session, "change:loggedIn", this.loggedChanged);
        },

        events: {
            'submit #login-form' : 'login'
        },

        login: function() {
            var userData = Syphon.serialize(this);
            app.session.login(userData);

            // Prevent default form submit
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