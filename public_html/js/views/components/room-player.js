define([
    'app',
    'tmpl/components/card-player'
], function(
    app,
    tmpl
){
    var View = Backbone.View.extend({

        className: 'card-player',
        template: tmpl,

        initialize: function () {
            this.render();
            this.listenTo(this.model, "remove", this.removeMe);
        },

        removeMe: function() {
            this.trigger("removeMe", this);
        },

        render: function () {
            this.$el.html(this.template(
                { "player": this.model.toJSON() }
            ));
        }
    });

    return View;
});

