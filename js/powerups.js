Powerups = Class.extend({

  layer: null,
  destroybleLayer: null,
  totalDestroyableBlock: null,
  totalPowerUps:null,

  // Tile number of power-ups 
  powerUpsName: [
    {extraBomb: null,         tile: 4},
    {explosionExpander: null, tile: 5},
    {accelerator: null,       tile: 6},
    {remoteControl: null,     tile: 7},
    {maximumExplosion: null,  tile: 8},
    {kick: null,              tile: 9},
    {boxingGlove: null,       tile: 10},
    {skull: null,             tile: 11}
  ],

  init: function(layer, destroybleLayer, totalDestroyableBlock) {
    this.layer                 = layer;
    // Powerups are hidden under destroyable blocks
    this.destroybleLayer       = destroybleLayer;
    this.totalDestroyableBlock = totalDestroyableBlock;
  },

  setup: function() {
    var totalDropChance    = 0;
    var accurateDropChance = 0;
    var totalDropItem      = 0;
    var canBeAdded         = 0;
    var desiredIndex       = 0;
    var dropChance         = [];
    var powerupsClasses    = [];
    var dropItem           = [];
    var availableTiles     = [];
    var randomIndexes      = [];

    var desiredRandomPowerups = utils.getRandomInt(
      (Math.floor(this.totalDestroyableBlock * (10 / 100))), 
      (Math.floor(this.totalDestroyableBlock * (40 / 100)))
    );

    // Total amount of tiles
    this.totalPowerUps = this.powerUpsName.length;

    for (var i = 0; i < this.powerUpsName.length; i++) {
      for (var key in this.powerUpsName[i]) {
        if (key != 'tile') {
          /*Capitalise the first letter only 
          to dynamically instantiate power-ups Classes*/
          var classDef = utils.capitaliseFirstLetter(key);
          this.powerUpsName[i][key] = new window[classDef];
          // Keep a track on the powerups Classes only
          powerupsClasses.push(this.powerUpsName[i][key]);
          // Keep a track on every power ups drop chance
          dropChance.push(this.powerUpsName[i][key].getDropChance());
        }
      }
    };

    // Calculate the total added drop chance value.
    totalDropChance = this.checkTotal(dropChance);

    // Calculate the drop rate based on the total drop chance value.
    for (var j = 0; j < powerupsClasses.length; j++) {
      accurateDropChance = powerupsClasses[j].getDropChance() / totalDropChance;
      itemDrops = Math.floor(accurateDropChance * desiredRandomPowerups);
      powerupsClasses[j].setDropItem(itemDrops);
      dropItem.push(itemDrops);
    };

    // Calculate how many items have been added to the total drop item. 
    totalDropItem = this.checkTotal(dropItem);

    /*Check the total drop item against the desired total powerups, 
    as rounding up numbers when calculating the drop rate mean that
    we might not have added enough items.*/ 
    canBeAdded = this.checkCanBeAdded(totalDropItem, desiredRandomPowerups);

    // Add drop items to the total, when none have been added 
    for (var k = 0; k < powerupsClasses.length; k++) {
      if (canBeAdded > 0) {
        var currentDrop = powerupsClasses[k].getDropItem();
        if (currentDrop < 1) {
          var addUpItem = 1;
          powerupsClasses[k].setDropItem(currentDrop + addUpItem);
          dropItem.push(addUpItem);
          canBeAdded--;
        } 
      }
    };

    totalDropItem = this.checkTotal(dropItem);

    // Check if more power ups have to be added to the total
    canBeAdded = this.checkCanBeAdded(totalDropItem, desiredRandomPowerups);

    // Randomly pick up a power up to add it up
    for (var z = 0; z < canBeAdded; z++) {
      var randomPowerUps = utils.getRandomIntFromArray(powerupsClasses);
      var currentDrop    = randomPowerUps.getDropItem();
      var addUpItem      = 1;
      randomPowerUps.setDropItem(currentDrop + addUpItem);
      dropItem.push(addUpItem);
    };

    for (var w = 0; w < this.destroybleLayer.data.length; w++) {
      if (this.destroybleLayer.data[w] > 0) {
        availableTiles.push(w);
      }
    };

    randomIndexes['index'] = [];
    randomIndexes['type']  = [];

    for (var i = 0; i < this.powerUpsName.length; i++) {
      for (var key in this.powerUpsName[i]) {
        for (var l = 0; l < powerupsClasses[i].getDropItem(); l++) {
          desiredIndex = utils.getRandomIntFromArray(availableTiles);
          if (randomIndexes['index'].indexOf(desiredIndex) > -1) l--;
          else {
            randomIndexes['index'].push(desiredIndex);
            randomIndexes['type'].push(this.powerUpsName[i]['tile']);
          }
        }
      }
    };

    // Add the value of 'randomIndexes' to the current layer data
    for (var value in randomIndexes) {
      for (var z = 0; z < randomIndexes['index'].length; z++) {
        this.layer.data[randomIndexes['index'][z]] = randomIndexes['type'][z];
      };
    }
  },

  getTotalPowerUps: function() {
    return this.totalPowerUps;
  },

  getCurrentLayer: function() {
    return this.layer;
  },

  checkTotal: function(array) {
    return utils.addNumbersInArray(array);
  },

  checkCanBeAdded: function(currentNbr, desiredNbr) {
    if (currentNbr < desiredNbr) {
      return (desiredNbr - currentNbr);
    } else return 0;
  }
});