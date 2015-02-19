define([
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
    'views/login'
], function( /* Задай вопрос, все ли ок, что я тут подрубаю */
    Backbone,
    Main,
    Game,
    Score,
    Login
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
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
        }
    });

    return new Router();
});