define([
    'backbone'
], function(
    Backbone
){

    var AlertManager = Backbone.Model.extend({
        alert: function(message, status) {
            this.trigger('alert', message, status);
        }
    });

    return new AlertManager();
});

