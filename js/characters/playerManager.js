PlayerManager = Class.extend({
  
  playerSprite: {},
  playerDirections: ['Front', 'Back', 'Left', 'Right'],
  playerAnim: ['Walk', 'Run'],
  playerNumberArray: [1, 2],
  currentObject: {},

  setup: function (sprite) {
    for (var name in sprite) {

      var playerNumber = name.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
      var action       = name.split('_')[1];
      var movement     = name.split('_')[2].replace(/[0-9]/g, '');

      // console.log(this.getList(this.playerDirections, movement, name));
      // console.log(this.getList(this.playerAnim, action, name));
      // console.log(this.getList(this.playerNumberArray, playerNumber, name));
    }
  },

  getList: function(currentArray, check, name) {
    if (currentArray.length > 0) {
      for (var j = 0; j < currentArray.length; j++) {
        if (check.indexOf(currentArray[j]) != -1) {
          if (this.currentObject[currentArray[j]]) {
            this.currentObject[currentArray[j]].push(name);
          } else {
            this.currentObject[currentArray[j]] = [];
            this.currentObject[currentArray[j]].push(name);
          }
        }
      };
      return this.currentObject;
    } else {
      return null;
    }
  },
});
