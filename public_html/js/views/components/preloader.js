define([
], function(
){

    var View = {

        el: '.spinner',

        show: function() {
            $(this.el).fadeIn();
        },

        hide: function() {
            $(this.el).hide();
        }
    };

    return View;
});