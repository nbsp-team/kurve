define([
    'tmpl/controller',
    'models/User',
    'views/AbstractScreen',
    'utils/api/ws/api_ws'
], function(
    tmpl,
    User,
    AbstractScreen,
    Api
){
    var View = AbstractScreen.extend({

        loginRequire: true,
        el: '.b-controller',
        template: tmpl,
        templateArg: User,

        events : {
            'touchstart .js-button-left': 'leftButtonDown',
            'touchend .js-button-left': 'leftButtonUp',

            'touchstart .js-button-right': 'rightButtonDown',
            'touchend .js-button-right': 'rightButtonUp'
        },

        leftButtonDown: function() {
            Api.sendKeyEvent(true, false);
        },

        leftButtonUp: function() {
            Api.sendKeyEvent(true, true);
        },

        rightButtonDown: function() {
            Api.sendKeyEvent(false, false);
        },

        rightButtonUp: function() {
            Api.sendKeyEvent(false, true);
        }
    });

    return View;
});