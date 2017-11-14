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
      this.game.physics.arcade.enable(this.player)
      // make sure palyer touches the edges of the screen
      this.player.body.collideWorldBounds = true;
      
      // bullets
      this.initBullets();
      // loop for every 5 sections
      this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.createPlayerBullet, this);
      
  },
  update: function() {
      this.player.body.velocity.x = 0;
      // listening to when the user touches the screen
      if(this.game.input.activePointer.isDown){
          var targetX = this.game.input.activePointer.position.x;
          // create ternary operator - takes three arguments. The first argument is a comparison argument, the second is the result upon a true comparison, and the third is the result upon a false comparison. If it helps you can think of the operator as shortened way of writing an if-else statement.
          var direction = targetX >= this.game.world.centerX ? 1 : -1;
          this.player.body.velocity.x = direction * this.PLAYER_SPEED;
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
            console.log('Phew Phew!');
        }
        else {
            // reset position
            
        }
        // set velocity
    }
};
