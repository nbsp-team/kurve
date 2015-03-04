define([
    'app',
    'tmpl/components/user',
    'models/User'
], function(
    app,
    tmpl,
    User
){
    var View = Backbone.View.extend({

        el: '#user-block',
        template: tmpl,

        initialize: function () {
            this.listenTo(app.session, 'change:loggedIn', this.update);
        },

        show: function() {
            $(this.el).fadeIn();
        },

        hide: function() {
            $(this.el).fadeOut();
        },

        update: function() {
            if (!app.session.get('loggedIn')) {
                this.hide();
            } else {
                this.render();
                this.show();
            }
        },

        render: function () {
            $(this.el).html(this.template(
                {
                    'app': app,
                    'user': app.session.user.toJSON()
                }
            ));
        }
    });

    return View;
});
