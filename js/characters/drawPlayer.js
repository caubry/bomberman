DrawPlayer = Class.extend({

  atlasName: null,
  scaleX: null,
  scaleY: null,

  init: function(atlasName, scale) {
    this.atlasName      = atlasName;
    this.scaleX         = scale.x;
    this.scaleY         = scale.y;
  },

  draw: function(sprite, positionOrigin) {
    this.drawImage(sprite, positionOrigin);
    mediator.call(mediatorEvent.PLAYER_RENDERED);
  },

  reDraw: function(sprite, positionOrigin) {
    this.drawImage(sprite, positionOrigin);
  },

  drawImage: function(sprite, positionOrigin) {
    var currentImage;
    var hlf;

    for (var key in sprite) {
      currentImage = sprite[key];

      hlf = {
        x: currentImage.cx,
        y: currentImage.cy
      };

      game.ctx.drawImage(this.atlasName, currentImage.x, currentImage.y, 
        currentImage.w, currentImage.h, positionOrigin.x + 
        hlf.x, positionOrigin.y + hlf.y, 
        currentImage.w * this.scaleX, currentImage.h * this.scaleY
      );
    }
  }

});