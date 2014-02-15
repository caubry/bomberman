PlayerManager = Class.extend({
  
  playerSprite: {},
  drawPlayer: null,
  requestId: 0,
  settimeoutID: 0,
  startTime: 0,
  newPos: {
    x: null, 
    y: null
  },
  currentFrame: null,
  counter: 0,
  action: 0,
  savedKeyCode: 0,
  keyCode: 0,

  upPressed: 0,
  downPressed: 0,
  leftPressed: 0,
  rightPressed: 0,

  init: function (loadedSprite) {
    var playerNumber, action, movement;
    var sprite    = loadedSprite.sprites;
    var atlasName = loadedSprite.atlasName;
    var _this = this;

    for (var name in sprite) {
      // 1 
      playerNumber = name.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
      // Walk 
      action       = name.split('_')[1];
      // Left, Right, Back or Front
      movement     = name.split('_')[2].replace(/[0-9]/g, '');

      if(!this.playerSprite[playerNumber]) {
        this.playerSprite[playerNumber] = {};
      }

      if(!this.playerSprite[playerNumber][action]) {
        this.playerSprite[playerNumber][action] = {};
      }

      if(!this.playerSprite[playerNumber][action][movement]) {
        this.playerSprite[playerNumber][action][movement] = [];
      }

      this.playerSprite[playerNumber][action][movement].push(sprite[name]);
    }

    // Initialise drawing
    this.drawPlayer = new DrawPlayer(atlasName, config.PLAYER_PROPERTIES.player_one.scale);
    this.drawPlayer.draw(this.playerSprite[1].Walk.Front[0], config.PLAYER_PROPERTIES.player_one.position);

    this.newPos = {
      x: config.PLAYER_PROPERTIES.player_one.position.x, 
      y: config.PLAYER_PROPERTIES.player_one.position.y
    };
    this.currentFrame = 0;
  },

  update: function() {
    var _this = this;

    (function animationLoop() {
      // Control the timing of an animation with requestAnimationFrame
      setTimeout(function() {
        _this.render();
        requestAnimationFrame(animationLoop, _this.update);
      }, 1000 / config.FPS);
    })();
  },

  onKeyDown: function(keyCode) {
    if (keyCode == config.PLAYER_UP)
      this.upPressed = 1;
    if (keyCode == config.PLAYER_DOWN)
      this.downPressed = 1;
    if (keyCode == config.PLAYER_LEFT)
      this.leftPressed = 1;
    if (keyCode == config.PLAYER_RIGHT)
      this.rightPressed = 1;
  },

  onKeyUp: function(keyCode) {
    if (keyCode == config.PLAYER_UP)
      this.upPressed = 0;
    if (keyCode == config.PLAYER_DOWN)
      this.downPressed = 0;
    if (keyCode == config.PLAYER_LEFT)
      this.leftPressed = 0;
    if (keyCode == config.PLAYER_RIGHT)
      this.rightPressed = 0;
  },

  changeAnim: function() {
    if (this.counter % 10 === 0) {
      if (this.currentFrame > 1) {
        this.currentFrame = 0;
      } else {
        this.currentFrame++;
      }
    }
  },

  render: function() {
    if (this.upPressed == 1) {
      this.action = 'Back';
      this.newPos.y -= 1;
    }
    else if (this.downPressed == 1) {
      this.action = 'Front';
      this.newPos.y += 1;
    }
    else if (this.rightPressed == 1) {
      this.action = 'Right';
      this.newPos.x += 1;
    }
    else if (this.leftPressed == 1) {
      this.action = 'Left';
      this.newPos.x -= 1;
    }

    if (this.upPressed == 1 || this.downPressed == 1 ||
      this.rightPressed == 1 || this.leftPressed == 1) {
      this.counter++;
      this.changeAnim(); 
      // Redraw the background
      mediator.call(mediatorEvent.REDRAW_PLAYERS);  
      // Draw user input on the map
      this.drawPlayer.reDraw(this.playerSprite[1].Walk[this.action][this.currentFrame], this.newPos);
    }
  }
});
