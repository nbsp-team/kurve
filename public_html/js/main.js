require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        syphon: "lib/backbone-syphon",
        notify: "lib/notify.min"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'notify': {
            deps: ['jquery'],
            exports: '$'
        }
    }
});

require([
    'backbone',
    'router'
], function(
    Backbone,
    Router
) {
    Backbone.history.start();
});