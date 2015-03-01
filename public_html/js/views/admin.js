define([
    'backbone',
    'tmpl/game',
    'models/admin',
    'views/abstract'
], function(
    Backbone,
    tmpl,
    User,
    Abstract
){

    var View = Abstract.extend({

        el: '#admin',
        template: tmpl,
        model: User,

        initialize: function () {

        }
    });

    return new View();
});
