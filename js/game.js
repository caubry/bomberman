Game = Class.extend({

  canvas: null,
  ctx: null,
  map: null,
  player: null,
  SpriteSheetAtlas: null,

  init: function(canvas) {
	this.canvas = canvas;
	this.ctx    = this.canvas.getContext('2d');

	this.map    = new Map();
	this.player = new Player();

    this.map.load(config.MAP_DATA);
    this.player.load(config.PLAYER_DATA);
  }
  
});
