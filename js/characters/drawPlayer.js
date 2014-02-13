DrawPlayer = Class.extend({

  atlasName: null,
  scaleX: null,
  scaleY: null,
  sprite: null,
  positionOrigin: null,

  init: function(atlasName, scale) {
    this.atlasName      = atlasName;
    this.scaleX         = scale.x;
    this.scaleY         = scale.y;
  },

  /*Draw on initialisation*/
  draw: function(sprite, positionOrigin) {
    this.sprite         = sprite;
    this.positionOrigin = positionOrigin;
    this.drawImage();
    mediator.call(mediatorEvent.PLAYER_RENDERED);
  },

  /*Draw every time a character moves*/
  reDraw: function(sprite, positionOrigin) {
    this.sprite         = sprite;
    this.positionOrigin = positionOrigin;
    this.drawImage();
  },

  /*Draw given sprite to the canvas*/
  drawImage: function() {
    var currentImage;
    var hlf;

    for (var key in this.sprite) {
      currentImage = this.sprite[key];

      hlf = {
        x: currentImage.cx,
        y: currentImage.cy
      };

      game.ctx.drawImage(this.atlasName, currentImage.x, currentImage.y, 
        currentImage.w, currentImage.h, this.positionOrigin.x + 
        hlf.x, this.positionOrigin.y + hlf.y, 
        currentImage.w * this.scaleX, currentImage.h * this.scaleY
      );
    }
  }

});