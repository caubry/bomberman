Mediator = Class.extend({
  registeredEvent: {},

  call: function(eventName, args) {
    if (!this.registeredEvent[eventName]) return;

    var a = this.registeredEvent[eventName].slice();
    var subscription;

    for (var i = a.length - 1; i >= 0; i--) {
      subscription = a[i];
      if (args !== null) {
        subscription.callback.apply(subscription.context, [args]);
      } else {
        subscription.callback.call(subscription.context);
      }
    }
  },

  create: function(scope, eventName, callback) {
    if(!this.registeredEvent[eventName]) {
        this.registeredEvent[eventName] = [];
    }
    this.registeredEvent[eventName].push({context:scope, callback:callback});
  },

  remove: function(scope, eventName, callback) {
    if(this.registeredEvent[eventName]) {
      for (var i = 0; i < this.registeredEvent[eventName].length; i++) {
        var e = this.registeredEvent[eventName][i];
        if(e.context == scope && e.callback == callback) {
          this.registeredEvent[eventName].splice(i, 1);
          return;
        }
      }
    }
  }
});