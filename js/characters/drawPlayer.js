DrawPlayer = Class.extend({
    movement: {
    RIGHT: 'move-right',
    LEFT: 'move-left',
    UP: 'move-up',
    DOWN: 'move-down'
  },
	/**
  * Draw on canvas
  */
  draw: function(name, xPos, yPos) {
    var currentImage;
    var hlf;
    var scaleX = 1.8;
    var scaleY = 1.8;

    for (var key in this.sprites[name]) {
      currentImage = this.sprites[name][key];

      hlf = {
        x: currentImage.cx,
        y: currentImage.cy
      };

      game.ctx.drawImage(this.atlasImage, currentImage.x, currentImage.y, 
        currentImage.w, currentImage.h, xPos + hlf.x, yPos + hlf.y, 
        currentImage.w * scaleX, currentImage.h * scaleY
      );
    };
  },

  /**
  * Move character around the map
  */
  move: function(movement) {
    if (movement === this.movement.RIGHT) {
      // this.xSpeed++;
    } else if (movement === this.movement.LEFT) {
      // this.xSpeed--;
    }
    if (movement === this.movement.UP) {
      // this.ySpeed--;
    } else if (movement === this.movement.DOWN) {
      // this.ySpeed += 2;
      // Check the new player position
      // for (var key in this.sprites['Player1_Walk_Front1']) {
      // }

      // Player x & y 
      // utils.calculateDistance();
      // if (this.keyPress > 3) {
      //   if (this.i > 2) this.i = 1;
      //   else this.i++;
      //   this.keyPress = 0;
      }
      // else this.keyPress++;
      // console.log(this.keyPressx)
    // }
    // this.currentPlayerWalkFront = 'Player1_Walk_Front' + this.i;
    // this.draw(this.currentPlayerWalkFront, this.xSpeed, this.ySpeed);
  },

  onKeyUp: function(movement) {
    if (movement === this.movement.DOWN) {
      // this.draw('Player1_Walk_Front1', this.xSpeed, this.ySpeed);
    }
  },

});