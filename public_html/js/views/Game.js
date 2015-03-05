define([
    'app',
    'konva',
    'tmpl/game',
    'views/AbstractScreen'
], function(
    app,
    Konva,
    tmpl,
    AbstractScreen
){

    var View = AbstractScreen.extend({

        el: '#game',
        template: tmpl,

        initialize: function () {
            // TODO
        },

        render: function () {
            $(this.el).html(this.template({'model': this.templateArg}));

            var width = 1000;
            var height = 500;
            var stage = new Konva.Stage({
                container: 'game__wrapper_container',
                width: width,
                height: height
            });

            var layer = new Konva.Layer();
            /*
             * leave center point positioned
             * at the default which is the top left
             * corner of the rectangle
             */
            var blueRect = new Konva.Rect({
                x: 400,
                y: 375,
                width: 100,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4
            });

            /*
             * move center point to the center
             * of the rectangle with offset
             */
            var yellowRect = new Konva.Rect({
                x: 520,
                y: 205,
                width: 100,
                height: 50,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 4,
                offset: {
                    x: 50,
                    y: 25
                }
            });
            /*
             * move center point outside of the rectangle
             * with offset
             */
            var redRect = new Konva.Rect({
                x: 400,
                y: 75,
                width: 100,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
                offset: {
                    x: -100,
                    y: 0
                }
            });
            layer.add(blueRect);
            layer.add(yellowRect);
            layer.add(redRect);
            stage.add(layer);

            // one revolution per 4 seconds
            var angularSpeed = 90;
            var anim = new Konva.Animation(function(frame) {
                var angleDiff = frame.timeDiff * angularSpeed / 1000;
                blueRect.rotate(angleDiff);
                yellowRect.rotate(angleDiff);
                redRect.rotate(angleDiff);
            }, layer);

            anim.start();
        }
    });

    return View;
});