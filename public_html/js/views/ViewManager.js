define([
    'views/Admin',
    'views/Game',
    'views/Login',
    'views/Main',
    'views/Register',
    'views/Room',
    'views/Scoreboard'
], function(
    Admin,
    Game,
    Login,
    Main,
    Register,
    Room,
    Scoreboard
){

    var ViewManager = Backbone.View.extend({

        ADMIN_VIEW: "admin",
        GAME_VIEW: "game",
        LOGIN_VIEW: "login",
        MAIN_VIEW: "main",
        REGISTER_VIEW: "register",
        ROOM_VIEW: "room",
        SCOREBOARD_VIEW: "scoreboard",

        views: {
            ADMIN_VIEW: null,
            GAME_VIEW: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            REGISTER_VIEW: null,
            ROOM_VIEW: null,
            SCOREBOARD_VIEW: null
        },

        currentView: null,

        initialize: function () {
            this.views[this.ADMIN_VIEW] = new Admin();
            //this.views[this.GAME_VIEW] = new Game();
            this.views[this.LOGIN_VIEW] = new Login();
            this.views[this.MAIN_VIEW] = new Main();
            this.views[this.REGISTER_VIEW] = new Register();
            this.views[this.ROOM_VIEW] = new Room();
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
        },

        displayView: function(viewKey) {

            if(this.currentView != null) {
                this.currentView.dispose();
            }

            var view = this.views[viewKey];

            view.load();
            this.currentView = view;
        }
    });

    return ViewManager;
});