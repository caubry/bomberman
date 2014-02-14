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
  },

  update: function() {

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

  render: function(keyCode) {
    // Grab the current time
    switch (keyCode) {
      case config.PLAYER_DOWN:
        this.newPos.y += 1;
      break;
      case config.PLAYER_RIGHT:
      //
      break;
      case config.PLAYER_LEFT:
      //
      break;
      case config.PLAYER_RIGHT:
      //
      break; 
    }

    // Draw user input on the map
    this.drawPlayer.reDraw(this.playerSprite[1].Walk.Front[2], this.newPos);
  },

  onKeyUp: function() {
    // Cancel the animation request
    if (this.requestId) {
      clearTimeout(this.settimeoutID);
      cancelAnimationFrame(this.requestId);
    }
    // Allow a new request to be called
    this.requestId = 0;
  }

});
