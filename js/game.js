Game = Class.extend({

  canvas: null,
  ctx: null,
  map: null,
  loadTiles: null,
  loadTexture: null,
  inputEngine:null,
  SpriteSheetAtlas: null,

  init: function(canvas) {
    this.canvas = canvas;
    this.ctx    = this.canvas.getContext('2d');

    mediator.create(mediatorEvent.KEY_DOWN, this.onKeyDown);
    mediator.create(mediatorEvent.KEY_UP, this.onKeyUp);
  },

  setup: function() {
    this.inputEngine = new InputEngine();
    // this.map         = new Map();
    this.loadTiles = new LoadTiles();
    // this.loadTexture = new LoadTexture();

    this.inputEngine.setup();
    // this.map.load(config.MAP_DATA);
    // this.loadTexture.load(config.PLAYER_DATA);
    this.loadTiles.setup(config.MAP_DATA);
  },

  onKeyDown: function(keyCode) {
    // game.map.redraw();
    // game.loadTexture.move(keyCode.data);
  },

  onKeyUp: function(keyCode) {
    // game.map.redraw();  
    // game.loadTexture.onKeyUp(keyCode.data);
  }
});
