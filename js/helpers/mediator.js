Mediator = Class.extend({
  registeredEvent: {},

  // call: function(eventName, data) {
  //   var myEvent  = this.registeredEvent[eventName];
  //   myEvent.data = data;
  //   document.dispatchEvent(myEvent);
  // },

  call: function(eventName, args) {
    if (!registeredEvent[eventName]) return;

    var a = registeredEvent[eventName].slice();
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

  // create: function(eventName, callback) {
  //   var myEvent = new CustomEvent(eventName, {
  //     bubbles: true,
  //     cancelable: true
  //   });

  //   document.addEventListener(eventName, callback, false);
  //   this.registeredEvent[eventName] = myEvent;
  // }

  create: function(scope, eventName, callback) {
    if(!registeredEvent[eventName]) {
        registeredEvent[eventName] = [];
    }
    registeredEvent[eventName].push({context:scope, callback:callback});
  },

  remove: function(scope, eventName, callback) {
    if(registeredEvent[eventName]) {
      for (var i = 0; i < registeredEvent[eventName].length; i++) {
        var e = registeredEvent[eventName][i];
        if(e.context == scope && e.callback == fn) {
          registeredEvent[eventName].splice(i, 1);
          return;
        }
      }
    }
  }
});

