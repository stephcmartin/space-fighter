var SpaceHipster = SpaceHipster || {};

SpaceHipster.GameState = {

  //initiate game settings
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -1000;

  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('space', 'assets/images/space.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
    this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);


  },
  //executed after everything is loaded
  create: function() {
      // moving stars background
      this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
      this.background.autoScroll(0, 10);
      // Player
      this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
      this.player.anchor.setTo(0.5);
      this.game.physics.arcade.enable(this.player);
      // make sure palyer touches the edges of the screen
      this.player.body.collideWorldBounds = true;
      
      // bullets
      this.initBullets();
      // loop for every 5 sections
      this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.createPlayerBullet, this);
      
      // create a group of enemies
      this.initEnemies();
      
  },
  update: function() {
        // 2 parameters: 'null' is the process callback, and 'this' is the context
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this); 
          this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this); 
      // ^ this also checks for collision
      this.player.body.velocity.x = 0;
      // listening to when the user touches the screen
      if(this.game.input.activePointer.isDown){
          var targetX = this.game.input.activePointer.position.x;
          // create ternary operator - takes three arguments. The first argument is a comparison argument, the second is the result upon a true comparison, and the third is the result upon a false comparison. If it helps you can think of the operator as shortened way of writing an if-else statement.
          var direction = targetX >= this.game.world.centerX ? 1 : -1;
          this.player.body.velocity.x = direction * this.PLAYER_SPEED;
     // check for overlapping between players and bullets
      }
  },
    // bullet initiation
    initBullets: function(){
        this.playerBullets = this.add.group();
        this.playerBullets.enableBody = true;
    },
    createPlayerBullet: function (){
        // trying to find the first bullet
        var bullet = this.playerBullets.getFirstExists(false);
        // if there is no bullet
        if(!bullet){
            bullet = new SpaceHipster.PlayerBullet(this.game, this.player.x, this.player.top);
            this.playerBullets.add(bullet);
        }
        else {
            // reset position
            bullet.reset(this.player.x, this.player.top);
        }
        // set velocity
        bullet.body.velocity.y = this.BULLET_SPEED;
    },
    initEnemies: function(){
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        // new group of enemy bullets
        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;
        
      this.enemy = new SpaceHipster.Enemy(this.game, 100, 100, 'greenEnemy', 10, this.enemyBullets);
      // add this object to the game
      this.enemies.add(this.enemy);
      this.enemy.body.velocity.x = 100;
      this.enemy.body.velocity.y = 50;
    },
    damageEnemy: function(bullet, enemy){
        // sprites have a method called 'damage', with the amount of health it needs to be 'damage' each time
        // it collides
        enemy.damage(1); // removes one every time it's hit
        bullet.kill(); // once the enemy has been kill the bullet is 'killed' and reused
    },
    killPlayer: function(){
        this.player.kill();
        this.game.state.start('GameState');
    },
    createEnemy: function(x , y, health, key, scale, speedX, speedY){
        var enemy = this.enemies.getFirstExists(false); // get the first one of dead enemies
        if(!enemy){
            enemy = new SpaceHipster.Enemy(this.game, x, y, key, health, this.enemyBullets);
            this.enemies.add(enemy);
        }
        enemy.reset(x, y, health, key, scale, speedX, speedY);
    }
};
