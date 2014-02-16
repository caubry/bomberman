DrawPlayer = Class.extend({

  atlasName: null,
  scaleX: null,
  scaleY: null,
  sprite: null,
  positionOrigin: null,
  hitBoxRect: null,

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
    console.log('CALL DRAW IMAGE');
    mediator.call(mediatorEvent.PLAYER_RENDERED);
  },

  drawHitBox: function(position) {
    this.hitBoxRect = {x: position.x - 10, y: position.y, w: 29, h: 30};
    game.ctx.beginPath();
    game.ctx.rect(this.hitBoxRect.x, this.hitBoxRect.y, this.hitBoxRect.w, this.hitBoxRect.h);
    game.ctx.fillStyle = 'red';
    game.ctx.fill();
  },

  getHitBox: function() {
    return this.hitBoxRect;
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
      console.log('DRAW PLAYER');
    }
  }

});