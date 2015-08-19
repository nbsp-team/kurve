define([
    'app',
    'tmpl/components/create-room-dialog',
    'models/NewRoomBindModel',
    'mvbind'
], function(
    app,
    tmpl,
    RoomBindModel,
    mvbind
){
    var View = Backbone.View.extend({

        el: '.cd-popup',
        template: tmpl,
        model: new RoomBindModel(),

        events: {
            'click': 'closePopup',
            'click .js-room-create': 'createRoom'
        },

        bind:{
            '.js-room-name': 'name',
            '.js-room-private': 'isPrivate'
        },

        initialize: function() {
        },

        createRoom: function() {

            var self = this;

            app.api.room.createRoom(this.model.toJSON()).then(
                function(data) {
                    console.log(data);
                    self.$el.removeClass('is-visible');
                },

                function(error) {
                    console.error(error);
                }
            );
        },

        showPopup: function() {
            this.render();
            this.mvbind();
            this.$el.addClass('is-visible');
        },

        closePopup: function(event) {
            if($(event.target).is('.js-close-popup') || $(event.target).is(this.el)) {
                event.preventDefault();
                this.$el.removeClass('is-visible');
            }
        },

        render: function () {
            $(this.el).html(this.template(
                {}
            ));
        }
    });

    return View;
});