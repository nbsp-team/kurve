define([
    'app',
    'tmpl/components/card-player',
    'hex2rgb'
], function(
    app,
    tmpl,
    hex2rgb
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
            this.readyBlock = this.$el.children('.js-photo-container')
                .children('.js-ready');
            var color = hexToRgb(this.model.get("color"));

            this.readyBlock.css(
                "background-color", "rgba(" + color.r + "," + color.g + "," + color.b + "," + "0.7)");

            this.setReady();
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
