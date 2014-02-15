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
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
  * Uppercase the first letter of a given String.
  */
  capitaliseFirstLetter: function(str) {
    return str.replace(/^./, function(txt) {
      return txt.toUpperCase();
    });
  },

  /**
  * Parse an array of numbers and
  * return the total value.
  */
  addNumbersInArray: function(array) {
    var total = 0;
    $.each(array,function() {
      total += this;
    });
    return total;
  },

  /**
  * Return the distance between 
  * two given points.
  */
  calculateDistance: function(xPos, yPos, xPos2, yPos2) {
    var diffX    = xPos - xPos2;
    var diffY    = yPos - yPos2;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 0) distance *= 1;
    return distance;
  },

  /**
  * Rectangle collision
  */
  rect_collision = function(x1, y1, size1, x2, y2, size2) {
    var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
    left1 = x1 - size1;
    right1 = x1 + size1;
    top1 = y1 - size1;
    bottom1 = y1 + size1;
    left2 = x2 - size2;
    right2 = x2 + size2;
    top2 = y2 - size2;
    bottom2 = y2 + size2;
    return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
  },

});