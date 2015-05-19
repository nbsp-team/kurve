define([
    'app',
    'tmpl/controller',
    'models/User',
    'views/AbstractScreen'
], function(
    app,
    tmpl,
    User,
    Abstract
){
    var View = Abstract.extend({

        el: '.b-controller',
        template: tmpl,
        templateArg: User,

        events : {
            'vmousedown .js-button-left': 'leftButtonDown',
            'vmouseup .js-button-left': 'leftButtonUp'
        },

        leftButtonDown: function() {
            console.log("down");
        },

        leftButtonUp: function() {
            console.log("up");
        }
    });

    return View;
});