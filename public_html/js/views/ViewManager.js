define([
    'views/Admin',
    'views/Game',
    'views/Login',
    'views/Main',
    'views/Room',
    'views/RoomManager',
    'views/Scoreboard',
    'views/Controller',
    'app'
], function(
    Admin,
    Game,
    Login,
    Main,
    Room,
    RoomManager,
    Scoreboard,
    Controller,
    app
){

    var ViewManager = Backbone.View.extend({

        ADMIN_VIEW: "admin",
        GAME_VIEW: "game",
        LOGIN_VIEW: "login",
        MAIN_VIEW: "main",
        ROOM_VIEW: "room",
        ROOM_MANAGER_VIEW: "room_manager",
        SCOREBOARD_VIEW: "scoreboard",
        CONTROLLER_VIEW: "controller",

        views: {
            ADMIN_VIEW: null,
            GAME_VIEW: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            ROOM_VIEW: null,
            ROOM_MANAGER_VIEW: null,
            SCOREBOARD_VIEW: null,
            CONTROLLER_VIEW: null
        },

        currentView: null,
        preloadView: null,

        initialize: function () {
            this.views[this.ADMIN_VIEW] = new Admin();
            this.views[this.GAME_VIEW] = new Game();
            this.views[this.LOGIN_VIEW] = new Login();
            this.views[this.MAIN_VIEW] = new Main();
            this.views[this.ROOM_VIEW] = new Room();
            this.views[this.ROOM_MANAGER_VIEW] = new RoomManager();
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
            this.views[this.CONTROLLER_VIEW] = new Controller();

            this.listenTo(app.wsEvents, "wsStartGame", this.startGame);
            this.listenTo(app.session, "login", this.navigateToMain);
            this.listenTo(app.session, "logout", this.navigateToMain);
        },

        navigateToMain: function() {
            if(this.currentView == this.views[this.MAIN_VIEW]) {
                this.currentView.load();
            } else {
                app.router.navigateToMain();
            }
        },

        displayView: function(viewKey) {

            var view = this.views[viewKey];

            if(view.loginRequire == true &&
                app.session.get('loggedIn') == false) {

                if(this.currentView != null) {
                    app.notify.notify("Вы должны быть авторизованны для перехода на эту страницу",
                        app.notify.notify.ERROR_STATUS);
                }
                this.navigateToMain();

            } else {

                if (this.currentView != null) {
                    this.currentView.dispose();
                }
                view.load();
                this.currentView = view;
            }
        },

        startGame: function(options) {

            var gameView = this.views[this.GAME_VIEW];

            if(app.isTouchDevice) {
                app.router.navigateTo("controller");
            } else {
                app.router.navigateTo("game");
                gameView.start.call(gameView, options);
            }
        }
    });

    return ViewManager;
});
