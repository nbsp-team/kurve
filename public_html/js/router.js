define([
    'app',
    'views/Main',
    'views/Game',
    'views/Scoreboard',
    'views/Login',
    'views/Register',
    'views/Admin',
    'views/components/user',
    'views/components/notify'
], function(
    app,
    Main,
    Game,
    Score,
    Login,
    Register,
    Admin,
    UserView,
    NotifyView
){
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            'admin': 'adminAction',
            '*default': 'defaultAction'
        },

        currentView: null,

        initialize: function () {

        },

        navigateTo: function(url) {
            this.navigate(url, {trigger: true});
        },

        showView: function(view) {
            this.initViews();

            if(this.currentView) {
                this.currentView.dispose();
                this.currentView.undelegateEvents();
            }

            this.currentView = view;
            view.load();
        },

        initViews: function() {
            if (!this.userView) {
                this.userView = new UserView();
                // TODO:
                app.session.triggerLoggedUpdate();
            }

            if (!this.notifyView) {
                this.notifyView = new NotifyView();
            }
        },

        /* ================ Navigate Utils ================ */

        defaultAction: function () {
            this.showView(new Main());
        },
        scoreboardAction: function () {
            this.showView(new Score());
        },
        gameAction: function () {
            this.showView(new Game());
        },
        loginAction: function () {
            this.showView(new Login());
        },
        registerAction: function () {
            this.showView(new Register());
        },
        adminAction: function () {
            this.showView(new Admin());
        }
    });

    return Router;
});