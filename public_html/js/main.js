require([
    'app',
    'router',
    'models/Session',
    'models/NotifyManager',
    'underscore'
], function(
    app,
    Router,
    SessionModel,
    NotifyManager
) {
    app.notify = new NotifyManager();
    app.wsEvents = new _.extend({}, Backbone.Events);
    app.session = new SessionModel({});
    app.router = new Router();


    app.session.checkAuth(function(isLogged){
        Backbone.history.start();
    });
});
