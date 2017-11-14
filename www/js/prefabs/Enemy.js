var SpaceHipster = SpaceHipster || {};

// parameters for enemy
SpaceHipster.Enemy = function (game, x, y, key, health, enemyBullets){
    // call the parent object
    Phaser.Sprite.call(this, game, x, y, key);  
    // pass it game
    this.game = game;
    //enable physics
//    this.game.physics.arcade.enable(this);
    // animation: 25 frames per section, does not repeat itself
    this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
    // anchor point to set to middle
    this.anchor.setTo(0.5);
    // health is a proerty that all sprites have
    this.health = health;
    this.enemyBullets = enemyBullets;
};

// inheritance
SpaceHipster.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.Enemy.prototype.constructor = SpaceHipster.Enemy;

// update method
SpaceHipster.Enemy.prototype.update = function(){
    // check x
    if(this.x < 0.05 * this.game.world.width){
        //if true then we want to push it to the right and change velocity
      this.x = 0.05 * this.game.world.width + 2;
      this.body.velocity.x *= -1 // reversing
    }
    else if(this.x > 0.95 * this.game.world.width){
      this.x = 0.95 * this.game.world.width - 2;
      this.body.velocity.x *= -1 // reversing
    }
    // if the top of the sprite reaches the edge of the screen, i.e disappeared
    if(this.top > this.game.world.height){
        this.kill();
    }
};

SpaceHipster.Enemy.prototype.damage = function(amount){
    // When we call damage on an enemy object, call the damage on the parent too.
    Phaser.Sprite.prototype.damage.call(this, amount);
    this.play('getHit'); // animation of 'flashing'
};