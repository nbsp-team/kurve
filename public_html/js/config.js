require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        deserialize: "lib/jquery-deserialize",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        relational: "lib/backbone-relational",
        syphon: "lib/backbone-syphon",
        notify: "lib/notify.min",
        konva: "lib/konva"
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