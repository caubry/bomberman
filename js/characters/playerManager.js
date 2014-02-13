PlayerManager = Class.extend({
  
  playerSprite: {},
  atlasName: null,
  positionOrigin: {
    player_one: {
      x: 48,
      y: 35
    },
    player_two: {},
    player_three: {},
    player_four: {}
  },
  drawPlayer: null,
  scale: {
    x: 1.8,
    y: 1.8
  },
  currentFrame: 0,
  refreshIntervalId: null,
  allowNextAnimation: null,
  moveTimer: 0,
  savedTimer: 0,

  init: function (loadedSprite) {
    var playerNumber, action, movement;
    var sprite     = loadedSprite.sprites;
    this.atlasName = loadedSprite.atlasName;

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
    this.drawPlayer = new DrawPlayer(this.atlasName, this.scale);
    this.drawPlayer.draw(this.playerSprite[1]['Walk']['Front'][0], this.positionOrigin.player_one);
  },

  move: function(keyCode) {
    var _this = this;
    var newPos = {
      x: null, 
      y: null
    };

    clearInterval(this.refreshIntervalId);

    this.refreshIntervalId = setInterval(
      function(){
        _this.onTick();
      }, (config.FPS - 1)
    );

    switch (keyCode) {
      case config.PLAYER_DOWN:
        if (this.moveTimer === this.savedTimer) {
          if (this.currentFrame < 2) {
            setInterval(
              function(){
                _this.currentFrame++;
              }, 0
            );
          } else {
            this.currentFrame = 0;
          }
        } else {
          this.currentFrame = 0;
        }
        this.positionOrigin.player_one.y += 5;
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

    this.drawPlayer.reDraw(this.playerSprite[1]['Walk']['Front'][this.currentFrame], this.positionOrigin.player_one);
    this.savedTimer = this.moveTimer;
    // this.currentFrame++;
    // this.drawPlayer.draw(this.playerSprite[1]['Walk']['Front'][this.currentFrame], this.positionOrigin);
  },

  unTick: function(keyCode) {
    clearInterval(this.refreshIntervalId);
  },

  onTick: function() {
    this.moveTimer++;
  }

});
