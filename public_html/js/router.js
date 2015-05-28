define([
    'app',
    'views/ViewManager',
    'views/components/user',
    'views/components/notify'
], function(
    app,
    ViewManager,
    UserView,
    NotifyView
){
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'room': 'roomAction',
            'login': 'loginAction',
            'admin': 'adminAction',
            'controller': 'controllerAction',
            '*default': 'defaultAction'
        },

        viewManager: null,

        initialize: function () {
            this.userView = new UserView();
            this.notifyView = new NotifyView();
            this.viewManager = new ViewManager();
        },

        navigateTo: function(url) {
            this.navigate(url, {trigger: true});
        },

        showView: function(view) {
            this.viewManager.displayView(view);
        },

        /* ================ Navigate Utils ================ */

        defaultAction: function () {
            this.showView(this.viewManager.MAIN_VIEW);
        },
        scoreboardAction: function () {
            this.showView(this.viewManager.SCOREBOARD_VIEW);
        },
        gameAction: function () {
            this.showView(this.viewManager.GAME_VIEW);
        },
        roomAction: function () {
            this.showView(this.viewManager.ROOM_VIEW);
        },
        loginAction: function () {
            this.showView(this.viewManager.LOGIN_VIEW);
        },
        adminAction: function () {
            this.showView(this.viewManager.ADMIN_VIEW);
        },
        controllerAction: function() {
            this.showView(this.viewManager.CONTROLLER_VIEW);
        }
    });

    return Router;
});
