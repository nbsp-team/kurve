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
        readyBlock: null,

        initialize: function () {
            this.render();
            this.listenTo(this.model, "remove", this.removeMe);
            this.listenTo(this.model, "change:is_ready", this.setReady);
        },

        removeMe: function() {
            this.trigger("removeMe", this);
        },

        render: function () {
            this.$el.html(this.template(
                { "player": this.model.toJSON() }
            ));

            this.$el.children('.js-player-color').
                css("background-color", this.model.get("color"));

            this.readyBlock = this.$el.children().children('.js-ready');

            this.setReady(this.model);
        },

        setReady: function() {
            var readyValue = this.model.get('is_ready');

            if(readyValue == true) {
                this.readyBlock.fadeIn();
            } else {
                this.readyBlock.fadeOut();
            }
        }
    });

    return View;
});
