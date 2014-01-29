/**
* 
*/
Utils = Class.extend({
  /**
  * Send a request to a server.
  */
  xhrGet: function(reqUri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", reqUri, true);
    xhr.onload = callback;
    xhr.send();
  },

  /**
  * Pass a min and max value
  * and return a random integer inbetween.
  */
	getRandomInt: function(min, max) {
   	return Math.floor(Math.random() * (max - min + 1)) + min;
  },
});