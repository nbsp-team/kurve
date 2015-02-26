define([
    'backbone',
    'tmpl/components/user',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){
    var View = Backbone.View.extend({

        el: '#user-block',
        template: tmpl,
        model: User,

        initialize: function () {
            this.listenTo(this.model, 'login:ok', this.render);
            this.listenTo(this.model, 'logout', this.hide);
        },

        render: function () {
            $(this.el).html(this.template({'user': this.model}));
            this.show();
        },

        show: function () {
            $(this.el).show();
        },

        hide: function () {
            $(this.el).hide();
        }
    });

    return new View();
});
