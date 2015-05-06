define([
    'app'
], function(
    app
){

    var NotifyManager = Backbone.Model.extend({
        notify: function(message, status) {
            this.trigger('notify', message, status);
        }
    });

    return NotifyManager;
});