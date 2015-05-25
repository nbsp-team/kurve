define([
    'app',
    'syphon',
    'tmpl/login',
    'views/AbstractScreen',
    'utils/AnotherUtils'
], function(
    app,
    Syphon,
    tmpl,
    AbstractScreen,
    utils
){

    var View = AbstractScreen.extend({

        el: '.b-login',
        template: tmpl,

        initialize: function() {
            this.listenTo(app.session, "change:loggedIn", this.loggedChanged);

            window.onSocialAuth = function(isSuccess) {
                if (isSuccess) {
                    console.log("auth!");
                    app.session.checkAuth(function(auth) {
                    })
                } else {
                    console.log("fail!");
                }
            };
        },

        load: function() {
            this.renderAndShow();
        },

        events: {
            'click .js-login-vk' : function(){ this.openAuthPopup(app.session.AUTH_PROVIDER_VK); },
            'click .js-login-fb' : function(){ this.openAuthPopup(app.session.AUTH_PROVIDER_FB); }
        },

        openAuthPopup: function(authProvider) {
            switch (authProvider) {
                case app.session.AUTH_PROVIDER_VK:
                    utils.openPopup(app.session.VK_OAUTH_URL, 'Авторизация', '900','640');
                    break;
                case app.session.AUTH_PROVIDER_FB:
                    utils.openPopup(app.session.FB_OAUTH_URL, 'Авторизация', '900','640');
                    break;
            }
        }
    });

    return View;
});