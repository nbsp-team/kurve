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

        el: '.b-login',
        template: tmpl,

        initialize: function() {
            this.listenTo(app.session, "change:loggedIn", this.loggedChanged);
        },

        load: function() {
            this.renderAndShow();
            var savedStateData = app.storage.loginStorage.getData();

            if(savedStateData) {
                Syphon.deserialize(this, savedStateData);
            }
        },

        events: {
            'submit .js-login-form' : 'login',
            'input .js-login-form': 'saveData'
        },

        saveData: function() {
            app.storage.loginStorage.setData(Syphon.serialize(this));
        },

        login: function() {
            var userData = Syphon.serialize(this);
            app.session.login(userData);
            return false;
        },

        loggedChanged: function() {
            if(app.session.get("loggedIn")) {
                app.storage.loginStorage.clear();
                app.router.navigateTo("/");
            }
        }
    });

    return View;
});