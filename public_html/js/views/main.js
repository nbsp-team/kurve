define([
    'backbone',
    'tmpl/main',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({

        el: 'body',
        template: tmpl,

        initialize: function () {
            // TODO
        },
        render: function () {
            $(this.el).html(this.template({'isLogin': User.get("isLogin")}));
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});