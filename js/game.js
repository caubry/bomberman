Game = Class.extend({

  canvas: null,
  ctx: null,
  map: null,

  init: function(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.map = new Map();
    this.map.load('tilesets');
  }
  
});
