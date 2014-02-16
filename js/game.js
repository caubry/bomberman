Game = Class.extend({

  canvas: null,
  ctx: null,
  mapLevel: null,
  textureManager:null,
  inputEngine:null,
  hasTiles: false,
  staticBlockInfo: null,

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
    game.staticBlockInfo = game.mapLevel.getLayerInfo(config.STATIC_BLOCK);
    console.log(game.staticBlockInfo);
    mediator.remove(game.canvas, mediatorEvent.TILES_LOADED, game.tilesLoaded);
  },

  textureLoaded: function(loadedSprite) {
    mediator.create(game.canvas, mediatorEvent.PLAYER_RENDERED, game.playerRendered);
    // Only start drawing characters if the background has been rendered.
    console.log(game.hasTiles);
    if (game.hasTiles) game.textureManager.draw(loadedSprite);
    else {
      // Draw characters onto map, only when the background has finished rendering.
      setTimeout(function() {
        if (game.hasTiles) {
          console.log('ELSE');
          game.textureManager.draw(loadedSprite);
        }
      }, 1000 / config.FPS);
    }
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
    mediator.create(game.canvas, mediatorEvent.REDRAW_PLAYERS, game.redrawMap);
    mediator.remove(game.canvas, mediatorEvent.PLAYER_RENDERED, game.playerRendered);
  },

  onKeyDown: function(keyCode) {
    game.textureManager.playerManager.onKeyDown(keyCode);
  },

  onKeyUp: function(keyCode) {
    game.textureManager.playerManager.onKeyUp(keyCode);
  },

  redrawMap: function() {
    game.mapLevel.draw(config.STATIC_BLOCK);
    game.mapLevel.draw(config.POWER_UPS);
    game.mapLevel.draw(config.DESPICABLE_BLOCK);
  },

  removeEvents: function() {
    mediator.remove(game.canvas, mediatorEvent.KEY_DOWN, game.onKeyDown);
    mediator.remove(game.canvas, mediatorEvent.KEY_UP, game.onKeyUp);
  }
});
