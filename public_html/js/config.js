require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        jquery_mobile: 'lib/jquery-mobile.min',
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        relational: "lib/backbone-relational",
        syphon: "lib/backbone-syphon",
        notify: "lib/notify.min",
        preloader: "lib/material-preloader",
        konva: "lib/konva"
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'jquery_mobile'],
            exports: 'Backbone'
        },
        'notify': {
            deps: ['jquery'],
            exports: '$'
        },
        'preloader': {
            deps: ['jquery']
        }
    }
});

require(['main']);