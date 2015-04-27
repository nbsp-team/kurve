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

        el: '.js-register',
        template: tmpl,

        events: {
            'submit .js-reg-form': 'register',
            'input .js-reg-form': 'saveData'
        },

        initialize: function () {
            this.listenTo(app.session, "change:loggedIn", this.loggedChanged);
        },

        load: function() {
            this.renderAndShow();
            var savedStateData = app.storage.registerStorage.getData();

            if(savedStateData) {
                Syphon.deserialize(this, savedStateData);
            }
        },

        saveData: function() {
            app.storage.registerStorage.setData(Syphon.serialize(this));
        },

        register: function () {
            var userData = Syphon.serialize(this);
            app.session.signup(userData);
            return false;
        },

        loggedChanged: function() {
            if (app.session.get("loggedIn")) {
                app.storage.registerStorage.clear();
                app.router.navigateTo("/");
            }
        }
    });

    return View;
});
