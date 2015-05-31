define([
], function(
){

    var View = {

        el: '.spinner',

        show: function() {
            console.log("show");
            $(this.el).fadeIn();
        },

        hide: function() {
            console.log("hide");
            $(this.el).hide();
        }
    };

    return View;
});