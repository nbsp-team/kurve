define([
    'backbone'
], function(
    Backbone
){
    var Session = Backbone.Model.extend({

        cookieName: "JSESSIONID",

        defaults: {
            "userSession": ""
        },

        initialize: function () {
            this.set('userSesion', this.getSession());
        },

        clearSession: function() {
            this.deleteCookie(this.cookieName);
        },

        getSession: function() {
            return this.getCookie(this.cookieName);
        },

        getCookie: function(name) {

            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));

            return matches ? decodeURIComponent(matches[1]) : undefined
        },

        deleteCookie: function(name) {
            setCookie(name, null, { expires: -1 })
        }

    });

    return new Session();
});

