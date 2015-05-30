define([
    'app',
    'models/QrCode',
    'tmpl/components/qrcode-popup'
], function(
    app,
    QrCode,
    tmpl
){
    var View = Backbone.View.extend({

        el: '.cd-popup',
        model: new QrCode(),
        template: tmpl,

        events: {
            'click': 'closePopup'
        },

        initialize: function() {
            this.listenTo(this.model, "change:url", this.onLoadUrl);
        },

        onLoadUrl: function(value) {
            alert(value.get("url"));
        },

        showPopup: function() {
            this.render();
            this.$el.addClass('is-visible');
            this.model.loadUrl();
        },

        closePopup: function(event) {
            if($(event.target).is('.js-close-popup') || $(event.target).is(this.el)) {
                event.preventDefault();
                this.$el.removeClass('is-visible');
            }
        },

        render: function () {
            $(this.el).html(this.template(
                {
                }
            ));
        }
    });

    return View;
});
