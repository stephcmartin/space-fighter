var SpaceHipster = SpaceHipster || {};

// parameters for enemy
SpaceHipster.Enemy = function (game, x, y, key, health, enemyBullets){
    // call the parent object
    Phaser.Sprite.call(this, game, x, y, key);
    // animation: 25 frames per section, does not repeat itself
    this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
    // anchor point to set to middle
    this.anchor.setTo(0.5);
    // health is a proerty that all sprites have
    this.health = health;
    this.enemyBullets = enemyBullets;
};

// inheritance
SpaceHipster.Enemy.prototype = Object. create(Phaser.Sprite.prototype);
SpaceHipster.Enemy.prototype.constructor = SpaceHipster.Enemy;

