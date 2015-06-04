define([
    'app',
    'tmpl/components/qrcode-popup',
    'models/QrCode',
    'qrcode'
], function(
    app,
    tmpl,
    QrCodeModel
){
    var View = Backbone.View.extend({

        el: '.cd-popup',
        model: new QrCodeModel(),
        qrCode: null,
        template: tmpl,

        events: {
            'click': 'closePopup'
        },

        initialize: function() {
            this.listenTo(this.model, "url_loaded", this.onLoadUrl);
        },

        onLoadUrl: function(url) {
            this.qrCode = new QRCode('js-qr-container', {
                text: url,
                width: 220,
                height: 220,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
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
