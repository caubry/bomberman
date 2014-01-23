/**
* 
*/
Game = Class.extend({
  canvas: null,
  ctx: null,
  background: null,

  init: function(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.background = new Background();
    this.background.load('tilesets');
  }
});
