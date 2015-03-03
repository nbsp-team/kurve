define([
    'backbone',
    'notify',
    'models/alertManager'
], function(
    Backbone,
    Notify,
    AlertManager
){

    var Alert = Backbone.View.extend({

        initialize: function () {
            this.listenTo(AlertManager, 'alert', this.showMessage);
        },

        showMessage: function(message, status) {
            $.notify(message, {
                position: 'bottom',
                className: status
            });
        }
    });

    return new Alert();
});
