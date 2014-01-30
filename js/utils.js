Utils = Class.extend({
  /**
  * Pass a min and max value
  * and return a random integer inbetween.
  */
	getRandomInt: function(min, max) {
   	return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
  * Pass an array
  * and return a random integer from this array.
  */
  getRandomIntFromArray: function(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
});