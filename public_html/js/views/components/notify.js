define([
    'app',
    'notify'
], function(
    app,
    notify
){

    var Notify = Backbone.View.extend({

        ERROR_STATUS: 'error',

        initialize: function () {
            this.listenTo(app.notify, 'notify', this.showMessage);
        },

        showMessage: function(message, status) {
            $.notify(message, {
                position: 'bottom',
                className: status
            });
        }
    });

    return Notify;
});
