define([
    'models/Room',
    'syncs/RoomsSync'
], function(
    Room,
    RoomsSync
){
    var Collection = Backbone.Collection.extend({
        model: Room,
        sync: RoomsSync,

        initialize: function () {}
    });

    return Collection;
});