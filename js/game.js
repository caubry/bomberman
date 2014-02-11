Game = Class.extend({

  canvas: null,
  ctx: null,
  map: null,
  textureManager:null,
  inputEngine:null,
  hasTiles: false,

  init: function(canvas) {
    this.canvas = canvas;
    this.ctx    = this.canvas.getContext('2d');

    // Loaders
    mediator.create(this.canvas, mediatorEvent.TILES_LOADED, this.tilesLoaded);
    mediator.create(this.canvas, mediatorEvent.TEXTURE_LOADED, this.textureLoaded);
    // User Inputs
    mediator.create(this.canvas, mediatorEvent.KEY_DOWN, this.onKeyDown);
    mediator.create(this.canvas, mediatorEvent.KEY_UP, this.onKeyUp);
  },

  setup: function() {
    this.map            = new Map();
    this.textureManager = new TextureManager();
    this.inputEngine    = new InputEngine();

    this.map.setup();
    this.textureManager.setup();
    this.inputEngine.setup();
  },

  tilesLoaded: function(loadedMap) {
    mediator.create(game.canvas, mediatorEvent.TILES_RENDERED, game.tilesRendered);
    game.map.tilesLoaded(loadedMap);
    mediator.remove(game.canvas, mediatorEvent.TILES_LOADED, game.tilesLoaded);
  },

  textureLoaded: function(loadedSprite) {
    if (game.hasTiles) game.textureManager.draw(loadedSprite);
    mediator.remove(game.canvas, mediatorEvent.TEXTURE_LOADED, game.textureLoaded);
  },

  tilesRendered: function() {
    game.hasTiles = true;
    mediator.remove(game.canvas, mediatorEvent.TILES_RENDERED, game.tilesRendered);
  },

  onKeyDown: function(keyCode) {
    // game.loadTexture.move(keyCode.data);
  },

  onKeyUp: function(keyCode) {
    // game.loadTexture.onKeyUp(keyCode.data);
  },

  removeEvents: function() {
    mediator.remove(game.canvas, mediatorEvent.KEY_DOWN, game.onKeyDown);
    mediator.remove(game.canvas, mediatorEvent.KEY_UP, game.onKeyUp);
  }
});
