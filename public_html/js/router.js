define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
    'views/login',
    'views/register'
], function(
    Backbone,
    Main,
    Game,
    Score,
    Login,
    Register
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