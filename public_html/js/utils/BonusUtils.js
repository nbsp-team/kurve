define(function() {

    return {
        // ********* Bonuses *********

        SPEED_SELF: 0,
        THIN_SELF: 1,
        SLOW_SELF: 2,
        BIG_HOLE_SELF: 3,
        TRAVERSE_WALLS_SELF: 4,
        SHARP_CORNERS_SELF: 5,
        ERASE_SELF: 6,
        SPEED_ENEMY: 7,
        THICK_ENEMY: 8,
        SLOW_ENEMY: 9,
        REVERSE_ENEMY: 10,
        BIG_TURNS_ENEMY: 11,
        TRAVERSE_WALLS_ALL: 12,
        DEATH_ALL: 13,

        // ********* Bonuses *********

        SPRITE_PATH: "../../img/bonuses.png",
        SPRITE_HEIGHT: 192,
        SPRITE_WIDTH: 192,

        SPRITE_HEIGHT_COUNT: 4,
        SPRITE_WIDTH_COUNT: 4,

        BONUS_HEIGHT: 48,
        BONUS_WIDTH: 48,

        img: new Image(),

        getBonusImageArgs: function(bonusIndex, x, y) {

            if(!this.img.src) {
                this.img.src = this.SPRITE_PATH;
            }

            var topOffset = Math.floor(bonusIndex / this.SPRITE_WIDTH_COUNT) * this.BONUS_HEIGHT;
            var leftOffset = bonusIndex % this.SPRITE_WIDTH_COUNT * this.BONUS_WIDTH;

            return [this.img, leftOffset, topOffset,
                this.BONUS_WIDTH, this.BONUS_HEIGHT,
                x, y, this.BONUS_WIDTH, this.BONUS_HEIGHT];
        }
    };
});

