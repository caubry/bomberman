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
  }
});