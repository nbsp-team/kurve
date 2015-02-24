define([
    'backbone',
    'tmpl/main',
    'notify',
    'models/user',
], function(
    Backbone,
    tmpl,
    Notify,
    User
){
    var View = Backbone.View.extend({

        el: '#menu',
        template: tmpl,
        model: User,

        initialize: function () {
            this.listenTo(this.model, 'signup:ok', this.renderSignupOk);
            this.listenTo(this.model, 'signup:error', this.renderSignupError);
        },

        dispose: function() {
            this.hide();
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
        },

        renderSignupOk: function(message) {
            $.notify("Готово", {
                position: 'bottom',
                className: 'success'
            });
        },

        renderSignupError: function(message) {
            $.notify(message, {
                position: 'bottom',
                className: 'error'
            });
        }
    });

    return new View();
});