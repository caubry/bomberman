Mediator = Class.extend({
  registeredEvent: {},

  call: function(eventName) {
    document.dispatchEvent(this.registeredEvent[eventName]);
  },

  create: function(eventName, callback) {
    var myEvent = new CustomEvent(eventName, {
      detail: {},
      bubbles: true,
      cancelable: true
    });

    document.addEventListener(eventName, callback, false);
    this.registeredEvent[eventName] = myEvent;
  }
});

