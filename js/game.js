Game = Class.extend({

  canvas: null,
  ctx: null,
  mapLevel: null,
  textureManager:null,
  inputEngine:null,
  staticBlockInfo: null,
  hasTiles: false,
  tileX: 0,
  tileY: 0,

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
    mediator.remove(game.canvas, mediatorEvent.TILES_LOADED, game.tilesLoaded);
  },

  textureLoaded: function(loadedSprite) {
    var _this = this;
    var setTime;

    // Draw characters onto map, only when the background has finished rendering.
    (function renderPlayer() {
      // Only start drawing characters if the background has been rendered.
      if (game.hasTiles) {
        mediator.create(game.canvas, mediatorEvent.PLAYER_RENDERED, game.playerRendered);
        game.textureManager.draw(loadedSprite, game.staticBlockInfo);
        mediator.remove(game.canvas, mediatorEvent.TEXTURE_LOADED, game.textureLoaded);
        clearTimeout(setTime);
      } else {
        setTime = setTimeout(function() {
          requestAnimationFrame(renderPlayer, _this.textureLoaded);
        }, 1000 / config.FPS);
      }
    })();
  },

  tilesRendered: function() {
    game.hasTiles = true;
    mediator.call(mediatorEvent.PLAYER_RENDERED);
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
    mediator.create(game.canvas, mediatorEvent.PLACE_BOMB, game.placeBomb);
    game.textureManager.playerManager.onKeyDown(keyCode);
  },

  onKeyUp: function(keyCode) {
    game.textureManager.playerManager.onKeyUp(keyCode);
    if (keyCode === config.PLAYER_BOMB) game.placeBomb(game.textureManager.playerManager.getPlayerPos());
  },

  placeBomb: function(player) {
    var x = Math.ceil(player.x);
    var y = Math.ceil(player.y);

    this.tileX = Math.floor(player.x / config.TILE_WIDTH);
    this.tileY = Math.floor(player.y / config.TILE_HEIGHT);
    game.redrawMap();
  },

  redrawMap: function() {
    game.mapLevel.draw(config.STATIC_BLOCK);
    game.mapLevel.draw(config.GREEN_AREA);
    // If user wants to place a bomb
    if (game.tileX && game.tileY) {
      game.mapLevel.addToBombLayer({x: game.tileX * config.TILE_WIDTH, y: game.tileY * config.TILE_WIDTH});
      game.textureManager.playerManager.drawPlayer.drawImage();
    }
  },

  removeEvents: function() {
    mediator.remove(game.canvas, mediatorEvent.KEY_DOWN, game.onKeyDown);
    mediator.remove(game.canvas, mediatorEvent.KEY_UP, game.onKeyUp);
  }
});
