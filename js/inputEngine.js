InputEngine = Class.extend({

  bindings: {},
  actions: {},

  init: function () {
    // WASD
    this.bind(87, 'move-up');
    this.bind(65, 'move-left');
    this.bind(83, 'move-down');
    this.bind(68, 'move-right');

    $(document).keydown(this.onKeyDown);
    $(document).keyup(this.onKeyUp);
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