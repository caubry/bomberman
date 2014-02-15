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

  move: function(keyCode) {
    var _this = this;

    // Allow a request at the time
    if (this.requestId === 0) {
      (function animationLoop() {
        // Control the timing of an animation with requestAnimationFrame
        _this.settimeoutID = setTimeout(function() {
          _this.render(keyCode);
          _this.requestId = requestAnimationFrame(animationLoop, _this.move);
        }, 1000 / config.FPS);
      })();
    }
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

  render: function(keyCode) {
    this.counter++;
    this.savedKeyCode = keyCode;

    if (keyCode === config.PLAYER_DOWN) {
      this.action = 'Front';
      this.changeAnim();
      this.newPos.y += 1;
    } else if (keyCode === config.PLAYER_UP) {
      this.action = 'Back';
      this.changeAnim();
      this.newPos.y -= 1;
    } else if (keyCode === config.PLAYER_RIGHT) {
      this.action = 'Right';
      this.changeAnim();
      this.newPos.x += 1;
    } else if (keyCode === config.PLAYER_LEFT) {
      this.action = 'Left';
      this.changeAnim();
      this.newPos.x -= 1;
    }
    // Draw user input on the map
    mediator.call(mediatorEvent.REDRAW_PLAYERS);  
    this.drawPlayer.reDraw(this.playerSprite[1].Walk[this.action][this.currentFrame], this.newPos);
  },

  onKeyUp: function(keyCode) {
    if (keyCode == this.savedKeyCode) {
    }

    // Cancel the animation request
    if (this.requestId) {
      clearTimeout(this.settimeoutID);
      cancelAnimationFrame(this.requestId);
    }

    // Allow a new request to be called
    this.requestId    = 0;
    this.counter      = 0;
    this.currentFrame = 0;
    this.drawPlayer.reDraw(this.playerSprite[1].Walk[this.action][this.currentFrame], this.newPos);
  }

});
