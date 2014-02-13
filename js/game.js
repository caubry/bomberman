Game = Class.extend({

  canvas: null,
  ctx: null,
  mapLevel: null,
  textureManager:null,
  inputEngine:null,
  hasTiles: false,

  init: function(canvas) {
    this.canvas = canvas;
    this.ctx    = this.canvas.getContext('2d');

    // Loaders
    mediator.create(this.canvas, mediatorEvent.TILES_LOADED, this.tilesLoaded);
    mediator.create(this.canvas, mediatorEvent.TEXTURE_LOADED, this.textureLoaded);
  },

  setup: function() {
    this.mapLevel       = new MapLevel();
    this.textureManager = new TextureManager();
    this.inputEngine    = new InputEngine();
  },

  tilesLoaded: function(loadedMap) {
    mediator.create(game.canvas, mediatorEvent.TILES_RENDERED, game.tilesRendered);
    game.mapLevel.tilesLoaded(loadedMap);
    mediator.remove(game.canvas, mediatorEvent.TILES_LOADED, game.tilesLoaded);
  },

  textureLoaded: function(loadedSprite) {
    mediator.create(game.canvas, mediatorEvent.PLAYER_RENDERED, game.playerRendered);
    // Only start drawing characters if the background has been rendered.
    if (game.hasTiles) game.textureManager.draw(loadedSprite);
    mediator.remove(game.canvas, mediatorEvent.TEXTURE_LOADED, game.textureLoaded);
  },

  tilesRendered: function() {
    game.hasTiles = true;
    mediator.remove(game.canvas, mediatorEvent.TILES_RENDERED, game.tilesRendered);
  },

  playerRendered: function() {
    // Add user inputs
    mediator.create(game.canvas, mediatorEvent.KEY_DOWN, game.onKeyDown);
    mediator.create(game.canvas, mediatorEvent.KEY_UP, game.onKeyUp);
    mediator.remove(game.canvas, mediatorEvent.PLAYER_RENDERED, game.playerRendered);
  },

  onKeyDown: function(keyCode) {
    // Just to test it out 
    game.mapLevel.draw(config.STATIC_BLOCK);
    game.mapLevel.draw(config.POWER_UPS);
    game.mapLevel.draw(config.DESPICABLE_BLOCK);
    game.textureManager.playerManager.move(keyCode);
  },

  onKeyUp: function(keyCode) {
    game.textureManager.playerManager.unTick(keyCode);
  },

  removeEvents: function() {
    mediator.remove(game.canvas, mediatorEvent.KEY_DOWN, game.onKeyDown);
    mediator.remove(game.canvas, mediatorEvent.KEY_UP, game.onKeyUp);
  }
});
