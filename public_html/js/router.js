define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
    'views/login',
    'views/register',
    'views/components/preloader',
    'views/components/user',
    'models/user'
], function(
    Backbone,
    Main,
    Game,
    Score,
    Login,
    Register,
    Preloader,
    UserView,
    User
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            '*default': 'defaultAction'
        },

        currentView: null,
        preloader: Preloader,

        initialize: function () {
            this.listenTo(User, 'redirect:home', this.navigateHome);
            this.listenTo(User, 'logout', this.defaultAction);
        },

        /* ================ Navigate Utils ================ */

        navigateHome: function() {
            this.navigateTo('/');
        },

        navigateTo: function(url) {
            this.navigate(url, {trigger: true});
        },

        /* ================ Navigate Utils ================ */

        defaultAction: function () {
            this.setView(Main);
        },
        scoreboardAction: function () {
            this.setView(Score);
        },
        gameAction: function () {
            this.setView(Game);
        },
        loginAction: function () {
            this.setView(Login);
        },
        registerAction: function () {
            this.setView(Register);
        },

        setView: function(view) {
            if(this.currentView) {
                this.currentView.dispose();
            }

            this.showPreloader();
            this.listenToOnce(view, 'loading:finish', this.hidePreloader);

            this.currentView = view;
            view.load();
        },

        showPreloader: function() {
            this.preloader.show();
        },

        hidePreloader: function() {
            this.preloader.hide();
        }
    });

    return new Router();
});