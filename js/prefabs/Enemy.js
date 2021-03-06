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
    // timer for shoting
    this.enemyTimer = this.game.time.create(false); // false means that the time timer will not destory after it finishes. It is kept alive
    // initiate this
    this.enemyTimer.start();
    this.scheduleShooting(); // this will schedule the next shooting
    
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
      this.body.velocity.x *= -1; // reversing
    }
    else if(this.x > 0.95 * this.game.world.width){
      this.x = 0.95 * this.game.world.width - 2;
      this.body.velocity.x *= -1; // reversing
    }
    // if the top of the sprite reaches the edge of the screen, i.e disappeared
    if(this.top > this.game.world.height){
        this.kill();
    }
};

SpaceHipster.Enemy.prototype.damage = function(amount){
    // When we call damage on an enemy object, call the damage on the parent too.
    Phaser.Sprite.prototype.damage.call(this, amount);
    this.play('getHit'); // animation of 'flashing' when hit
    // partical explosion when enemy dies
    // if the health of the enemy has reached '0', then we need to show an explosion
    if(this.health <= 0){
        // create new emitter
        var emitter = this.game.add.emitter(this.x, this.y, 100);
        emitter.makeParticles('enemyParticle');
        // set min and max speed for our particles on x and y
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        // initiate explosion.
        // parameters are: #1 - do you want an explosion 
        // #2 - how long will they live for, i.e lifespan of 500 miliseconds
        // #3 - frequencies
        // #4 - how many do we want released
        emitter.start(true, 500, null, 100);
        this.enemyTimer.pause();
    }
};

SpaceHipster.Enemy.prototype.reset = function(x, y, health, key, scale, speedX, speedY){
    Phaser.Sprite.prototype.reset.call(this, x, y, health);
    this.loadTexture(key); // this will change the image
    this.scale.setTo(scale);
    this.body.velocity.x = speedX;
    this.body.velocity.y = speedY;
    this.enemyTimer.resume();
};

SpaceHipster.Enemy.prototype.scheduleShooting = function (){
  this.shoot();
  this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this); // timer for how fast the bullets are shot
};
SpaceHipster.Enemy.prototype.shoot = function(){
    // create pool of objects behavior for enemy bullets
    var bullet = this.enemyBullets.getFirstExists(false); // gets a dead bullet
    // if there isn't one:
    if(!bullet){
        bullet = new SpaceHipster.EnemyBullet(this.game, this.x, this.bottom);
        this.enemyBullets.add(bullet);
    }
    else {
        bullet.reset(this.x, this.y);
    }
    bullet.body.velocity.y = 100;
};