Mediator = Class.extend({
  registeredEvent: {},

  call: function(eventName, data) {
    var myEvent  = this.registeredEvent[eventName];
    myEvent.data = data;
    document.dispatchEvent(myEvent);
  },

  create: function(eventName, callback) {
    var myEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true
    });

    document.addEventListener(eventName, callback, false);
    this.registeredEvent[eventName] = myEvent;
  }
});

