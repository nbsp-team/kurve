define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
    'views/login',
    'views/register',
    'models/user'
], function(
    Backbone,
    Main,
    Game,
    Score,
    Login,
    Register,
    User
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            '*default': 'defaultActions'
        },

        currentView: null,

        initialize: function () {
            this.listenTo(User, 'login:ok', this.navigateHome);
            this.listenTo(User, 'logout', this.defaultActions);
        },

        /* ================ Navigate Utils ================ */

        navigateHome: function() {
            alert(1);
            this.navigateTo('/');
        },

        navigateTo: function(url) {
            this.navigate(url, {trigger: true});
        },

        /* ================ Navigate Utils ================ */

        defaultActions: function () {
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

        setView: function(model) {

            if(this.currentView) {
                this.currentView.dispose();
            }
            this.currentView = model;
            model.render();
        }
    });

    return new Router();
});