Game = Class.extend({

  canvas: null,
  ctx: null,
  map: null,
  player: null,
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
    this.map         = new Map();
    this.player      = new Player();

    this.inputEngine.setup();
    this.map.load(config.MAP_DATA);
    this.player.load(config.PLAYER_DATA);
  },

  onKeyDown: function(keyCode) {
    game.map.redraw();
    game.player.move(keyCode.data);
  },

  onKeyUp: function(keyCode) {
    game.map.redraw();  
    game.player.onKeyUp(keyCode.data);
  }
});
