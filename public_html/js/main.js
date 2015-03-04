require([
    'app',
    'router',
    'models/Session',
    'models/NotifyManager'
], function(
    app,
    Router,
    SessionModel,
    NotifyManager
) {
    app.session = new SessionModel({});
    app.router = new Router();
    app.notify = new NotifyManager();

    app.session.checkAuth(function(isLogged){
        Backbone.history.start();
    });
});