define([
    'app'
], function(
    app
) {
    var View = Backbone.View.extend({

        className: 'card-player',
        template: tmpl,

        initialize: function () {

        }
    });

    return View;
});

