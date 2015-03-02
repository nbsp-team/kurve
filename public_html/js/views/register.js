define([
    'backbone',
    'syphon',
    'tmpl/register',
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

        el: '#register',
        template: tmpl,
        model: User,
        templateArg: User,

        events: {
            'submit #reg-form' : 'register'
        },

        initialize: function () {},

        register: function() {
            var userData = Syphon.serialize(this);
            this.model.register(userData);
            return false;
        }
    });

    return new View();
});