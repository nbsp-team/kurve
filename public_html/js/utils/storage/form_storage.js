define([], function() {

    return function(key) {

        //TODO: data-key session

        this.DATA_KEY = key;

        this.setData = function(data) {
            localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
        };

        this.getData = function() {
            return JSON.parse(localStorage.getItem(this.DATA_KEY));
        };

        this.clear = function() {
            localStorage.removeItem(this.DATA_KEY);
        }
    };
});

