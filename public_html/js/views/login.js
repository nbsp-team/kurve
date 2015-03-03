define([
    'backbone',
    'syphon',
    'tmpl/login',
    'models/user',
    'views/abstract'
], function(
    Backbone,
    Syphon,
    tmpl,
    User,
    Abstract
){

    var View = Abstract.extend({

        el: '#login',
        template: tmpl,
        model: User,
        templateArg: User,

        events: {
            'submit #login-form' : 'login'
        },

        login: function() {
            var userData = Syphon.serialize(this);
            this.model.login(userData);
            return false;
        }
    });

    return new View();
});