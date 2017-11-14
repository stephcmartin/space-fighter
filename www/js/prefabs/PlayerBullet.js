var SpaceHipster = SpaceHipster || {};

// inherits from phaser.sprite class object
SpaceHipster.PlayerBullet = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');
    // ^ This means when we create a player, bullet needs to be created with the corresponding cords.
    this.anchor.setTo(0.5);
    // Check if the sprite is out of the bounds of the world, if it is then kill it.
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};
// creating an object that is similar or the same type as the prototype of the sprite
SpaceHipster.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.PlayerBullet.prototype.constructor = SpaceHipster.PlayerBullet;