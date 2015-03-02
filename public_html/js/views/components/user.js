define([
    'backbone',
    'tmpl/components/user',
    'models/user',
    'views/abstract'
], function(
    Backbone,
    tmpl,
    User,
    Abstract
){
    var View = Abstract.extend({

        el: '#user-block',
        template: tmpl,
        model: User,
        templateArg: User,

        initialize: function () {
            this.listenTo(this.model, 'login:ok', this.render);
            this.listenTo(this.model, 'logout', this.hide);
        }
    });

    return new View();
});
