define(function() {
    return {
        isTouchDevice: function() {
            return 'ontouchstart' in window
                || 'onmsgesturechange' in window;
        }
    };
});
