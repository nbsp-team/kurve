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
        defaultActions: function () {
            Main.render();
        },
        scoreboardAction: function () {
            Score.render();
        },
        gameAction: function () {
            Game.render();
        },
        loginAction: function () {
            Login.render();
        },
        registerAction: function () {
            Register.render();
        }
    });

    return new Router();
});