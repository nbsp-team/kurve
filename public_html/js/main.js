require([
    'app',
    'router',
    'models/Session',
    'models/NotifyManager',
    'utils/AnotherUtils',
    'views/components/preloader'
], function(
    app,
    Router,
    SessionModel,
    NotifyManager,
    AnotherUtils,
    Preloader
) {
    app.notify = new NotifyManager();
    app.preloader = Preloader;
    app.wsEvents = new _.extend({}, Backbone.Events);
    app.session = new SessionModel({});
    app.router = new Router();
    app.isTouchDevice = AnotherUtils.isTouchDevice();

    app.session.checkAuth(function(isLogged){
        Backbone.history.start();
    });
});
