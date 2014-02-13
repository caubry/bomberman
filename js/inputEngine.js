InputEngine = Class.extend({

  bindings: {},
  actions: {},

  mouse: {
    x: 0,
    y: 0
  },

  init: function () {
    var _this = this;

    // WASD
    this.bind(87, 'move-up');
    this.bind(65, 'move-left');
    this.bind(83, 'move-down');
    this.bind(68, 'move-right');

    document.addEventListener('keydown', _this.onKeyDown);
    document.addEventListener('keyup', _this.onKeyUp);
  },

  onKeyDown: function (e) {
    var action = game.inputEngine.bindings[e.keyCode];
    if (action) {
      game.inputEngine.actions[action] = true;
      mediator.call(mediatorEvent.KEY_DOWN, action);  
    }
  },

  onKeyUp: function (e) {
    var action = game.inputEngine.bindings[e.keyCode];
    if (action) {
      game.inputEngine.actions[action] = false;
      mediator.call(mediatorEvent.KEY_UP, action);   
    }   
  },

  bind: function (key, action) {
    this.bindings[key] = action;
  }

});