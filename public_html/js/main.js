require([
    'app',
    'router',
    'models/Session',
    'models/NotifyManager',
    'utils/AnotherUtils'
], function(
    app,
    Router,
    SessionModel,
    NotifyManager,
    AnotherUtils
) {
    app.notify = new NotifyManager();
    app.wsEvents = new _.extend({}, Backbone.Events);
    app.session = new SessionModel({});
    app.router = new Router();
    app.isTouchDevice = AnotherUtils.isTouchDevice();

    app.session.checkAuth(function(isLogged){
        Backbone.history.start();
    });
});
