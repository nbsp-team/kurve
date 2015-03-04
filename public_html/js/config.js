require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        relational: "lib/backbone-relational",
        syphon: "lib/backbone-syphon",
        notify: "lib/notify.min"
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'notify': {
            deps: ['jquery'],
            exports: '$'
        }
    }
});

require(['main']);