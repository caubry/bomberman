PlayerManager = Class.extend({
  
  playerSprite: {},
  drawPlayer: null,
  staticBlockInfo: null,
  newPos: {},
  hitBoxWalls: {},
  currentFrame: null,
  playerHitBox: null,
  collision: null,
  counter: 0,
  action: 0,
  keyCode: 0,

  upPressed: 0,
  downPressed: 0,
  leftPressed: 0,
  rightPressed: 0,
  vSpeed: 1,
  savedhitBoxWalls: {},
  w: 0, 
  h: 0, 
  dx: 0, 
  dy: 0,

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

    this.hitBoxWalls = {
      x: config.PLAYER_PROPERTIES.player_one.position.x - config.HITBOX_WALLS.player_one.position.x, 
      y: config.PLAYER_PROPERTIES.player_one.position.y - config.HITBOX_WALLS.player_one.position.y,
      w: config.HITBOX_WALLS.player_one.position.w,
      h: config.HITBOX_WALLS.player_one.position.h
    };

    this.savedhitBoxWalls = {
      x: config.HITBOX_WALLS.player_one.position.x, 
      y: config.HITBOX_WALLS.player_one.position.y
    };
    
    this.drawPlayer.drawHitBox(this.hitBoxWalls);
    this.currentFrame = 0;
  },

  update: function(staticBlockInfo) {
    var _this = this;
    this.staticBlockInfo = staticBlockInfo;

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
    var prevX = this.newPos.x;
    var prevY = this.newPos.y;
    this.collision = false; 

    if (this.upPressed == 1) {
      this.action = 'Back';
      this.newPos.y -= this.vSpeed;
    }
    else if (this.downPressed == 1) {
      this.action = 'Front';
      this.newPos.y += this.vSpeed;
    }
    else if (this.rightPressed == 1) {
      this.action = 'Right';
      this.newPos.x += this.vSpeed;
    }
    else if (this.leftPressed == 1) {
      this.action = 'Left';
      this.newPos.x -= this.vSpeed;
    }

    this.hitBoxWalls.x = this.newPos.x - this.savedhitBoxWalls.x;
    this.hitBoxWalls.y = this.newPos.y - this.savedhitBoxWalls.y;

    if (this.upPressed == 1 || this.downPressed == 1 ||
      this.rightPressed == 1 || this.leftPressed == 1) {
      this.counter++;
      this.changeAnim(); 

      // Redraw the background
      mediator.call(mediatorEvent.REDRAW_PLAYERS);  
      // Draw user input on the map
      this.drawPlayer.reDraw(this.playerSprite[1].Walk[this.action][this.currentFrame], this.newPos);
      this.drawPlayer.drawHitBox(this.hitBoxWalls);
      this.playerHitBox = this.drawPlayer.getHitBox();

      for (var i = 0; i < this.staticBlockInfo.length; i++) {
        if (this.checkCollision(this.staticBlockInfo[i])) {

          this.w = 0.5 * (this.playerHitBox.w + this.staticBlockInfo[i].w);
          this.h = 0.5 * (this.playerHitBox.h + this.staticBlockInfo[i].h);
          this.dx = (this.playerHitBox.x + (this.playerHitBox.w / 2)) - (this.staticBlockInfo[i].x + (this.staticBlockInfo[i].w / 2));
          this.dy = (this.playerHitBox.y + (this.playerHitBox.h / 2)) - (this.staticBlockInfo[i].y + (this.staticBlockInfo[i].h / 2));
          
          var wy = this.w * this.dy;
          var hx = this.h * this.dx;

          // TODO: Some corners are glitchy, I need to add more logic here
          if (this.hitBoxWalls.y > 39 && this.hitBoxWalls.y < 390 &&
              this.hitBoxWalls.x > 35 && this.hitBoxWalls.x < 460) {
            if (wy > hx) {
              if (wy >= -hx) {
                  /* collision at the top */
                if (this.playerHitBox.x < (this.staticBlockInfo[i].x + ((this.staticBlockInfo[i].w / 2) - 20))) {
                  prevX -= 0.005;
                } else if (this.playerHitBox.x > (this.staticBlockInfo[i].x + (this.staticBlockInfo[i].w / 2))) {
                  prevX += 0.005;
                }
              } else {
                  /* on the right */
                if (this.playerHitBox.y < (this.staticBlockInfo[i].y + ((this.staticBlockInfo[i].h / 2) - 20))) {
                  prevY -= 0.005;
                } else if (this.playerHitBox.y > this.staticBlockInfo[i].y + 15) {
                  prevY += 0.005;
                }
              }
            } else {
              if (wy > -hx) {
                  /* on the left */
                if (this.playerHitBox.y < (this.staticBlockInfo[i].y - 5)) {
                  prevY -= 0.005;
                } else if (this.playerHitBox.y > (this.staticBlockInfo[i].y + (this.staticBlockInfo[i].h - 20))) {
                  prevY += 0.005;
                }
              } else {
                  /* at the bottom */
                if (this.playerHitBox.x < (this.staticBlockInfo[i].x - 5)) {
                  prevX -= 0.005;
                } else if (this.playerHitBox.x > (this.staticBlockInfo[i].x + (this.staticBlockInfo[i].w - 15))) {
                  prevX += 0.005;
                }
              }
            }
          }

          this.newPos.x = prevX;
          this.newPos.y = prevY;
          this.collision = true;
        } 
      } 
    }
  },

  checkCollision: function(staticBlockInfo) {
    if ((this.playerHitBox.x < (staticBlockInfo.x + staticBlockInfo.w) && 
        Math.floor(this.playerHitBox.x + this.playerHitBox.w) > staticBlockInfo.x) && 
        (this.playerHitBox.y < (staticBlockInfo.y + staticBlockInfo.h) && 
        Math.floor(this.playerHitBox.y + this.playerHitBox.h) > staticBlockInfo.y))
    {
        return true;
    }
  }

});