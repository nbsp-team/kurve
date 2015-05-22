define([
    'preloader'
], function(
    preloader
){

    var View = {

        preloader: new $.materialPreloader({
            position: 'top',
            height: '5px',
            col_1: '#159756',
            col_2: '#da4733',
            col_3: '#3b78e7',
            col_4: '#fdba2c',
            fadeOut: 100,
            fadeIn: 100
        }),

        show: function() {
            this.preloader.on();
        },

        hide: function() {
            this.preloader.off();
        }
    };

    return View;
});