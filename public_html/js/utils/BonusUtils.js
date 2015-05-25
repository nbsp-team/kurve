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
        self_bonuses:[0, 1, 2, 3, 4, 5, 6],
        enemy_bonuses:[7, 8, 9, 10, 11],
        all_bonuses:[12, 13],
        temp_bonuses: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],

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
                this.BONUS_WIDTH,
                this.BONUS_HEIGHT,
                x - this.BONUS_WIDTH / 2,
                y - this.BONUS_HEIGHT / 2,
                this.BONUS_WIDTH,
                this.BONUS_HEIGHT];
        },
        assignBonus: function(bonus, snakes, eater_id) {
            if(this.temp_bonuses.indexOf(bonus.kind) === -1) return;
            if(this.self_bonuses.indexOf(bonus.kind) != -1) {
                snakes[eater_id].effects.addEffect(bonus);
            } else if (this.enemy_bonuses.indexOf(bonus.kind) != -1) {
                for(var i = 0; i < snakes.length; i++) if (i != eater_id) {
                    snakes[i].effects.addEffect(bonus);
                }
            } else {
                for(var i = 0; i < snakes.length; i++) {
                    snakes[i].effects.addEffect(bonus);
                }
            }
        },
        colorOf: function(bonus){
            if(this.self_bonuses.indexOf(bonus.kind) != -1) {
                return 'green';
            } else if (this.enemy_bonuses.indexOf(bonus.kind) != -1) {
                return 'red';
            } else {
                return 'blue';
            }
        },
        timeOutOf: function(bonus){
            switch(bonus.kind){
                case this.SPEED_SELF: return 3;
                case this.THIN_SELF: return 15;
                case this.SLOW_SELF: return 10;
                case this.BIG_HOLE_SELF: return 6;
                case this.TRAVERSE_WALLS_SELF: return 15;
                case this.SHARP_CORNERS_SELF: return 15;
                case this.SPEED_ENEMY: return 3;
                case this.THICK_ENEMY: return 7;
                case this.SLOW_ENEMY: return 5;
                case this.REVERSE_ENEMY: return 5;
                case this.BIG_TURNS_ENEMY: return 6;
                case this.TRAVERSE_WALLS_ALL: return 10;
            }
            return 0;
        }
    };
});

