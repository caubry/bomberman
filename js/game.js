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
    // mediator.create(mediatorEvent.TILES_LOADED, this.tilesLoaded);
  },

  setup: function() {
    this.inputEngine = new InputEngine();
    this.loadTiles = new LoadTiles();
    // this.loadTexture = new LoadTexture();

    this.inputEngine.setup();
    // this.loadTexture.load(config.PLAYER_DATA);
    this.loadTiles.setup(config.MAP_DATA);
    this.drawTiles.setup(game.loadTiles.data, this.mapLayers, this.tileset);

  },

  tilesLoaded: function(data) {
    console.log(data);  
  },

  onKeyDown: function(keyCode) {
    // game.loadTexture.move(keyCode.data);
  },

  onKeyUp: function(keyCode) {
    // game.loadTexture.onKeyUp(keyCode.data);
  }
});
