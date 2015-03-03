define([
    'backbone'
], function(
    Backbone
){

    var Redirector = Backbone.Model.extend({
        redirectTo: function(url) {
            this.trigger('navigate', url);
        }
    });

    return new Redirector();
});

