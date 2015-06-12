define([
], function(
){

    var NotifyManager = Backbone.Model.extend({
        notify: function(message, status) {
            this.trigger('notify', message, status);
        }
    });

    return NotifyManager;
});