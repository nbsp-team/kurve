require([
    'app',
    'router',
    'models/Session',
    'models/NotifyManager',
    'utils/AnotherUtils',
    'views/components/preloader',
    'views/components/qrcode-popup'
], function(
    app,
    Router,
    SessionModel,
    NotifyManager,
    AnotherUtils,
    Preloader,
    QrPopup
) {
    app.notify = new NotifyManager();
    app.preloader = Preloader;
    app.wsEvents = new _.extend({}, Backbone.Events);
    app.session = new SessionModel({});
    app.router = new Router();
    app.qrPopup = new QrPopup();
    app.isTouchDevice = AnotherUtils.isTouchDevice();

    window.onSocialAuth = function() {
        app.session.set("loggedIn", true);
        app.session.trigger("login");
    };

    app.session.checkAuth(function(isLogged){
        Backbone.history.start();
    });
});
