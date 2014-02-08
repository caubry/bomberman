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

    mediator.create('KEY_DOWN', function(){console.log('KEY_DOWN')});
    mediator.create('KEY_UP', function(){console.log('KEY_UP')});
  },

  setup: function() {
    this.inputEngine = new InputEngine();
    this.map         = new Map();
    this.player      = new Player();

    this.inputEngine.setup();
    this.map.load(config.MAP_DATA);
    this.player.load(config.PLAYER_DATA);
  }
});
