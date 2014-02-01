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
    var dropChance         = [];
    var powerupsClasses    = [];
    var dropItem           = [];
    var extraDropItem           = [];

    var desiredRandomPowerups = utils.getRandomInt(
      (Math.floor(this.totalDestroyableBlock * (10 / 100))), 
      (Math.floor(this.totalDestroyableBlock * (40 / 100)))
    );
    console.log('desiredRandomPowerups: ' + desiredRandomPowerups);

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

    // Get the total drop chance value
    $.each(dropChance,function() {
      totalDropChance += this;
    });

    // Give the exact drop rate based on the total drop chance
    for (var j = 0; j < powerupsClasses.length; j++) {
      accurateDropChance = powerupsClasses[j].getDropChance() / totalDropChance;
      itemDrops = Math.floor(accurateDropChance * desiredRandomPowerups);
      powerupsClasses[j].setDropItem(itemDrops);
      dropItem.push(itemDrops);
    };

    // Get the total drop chance value
    $.each(dropItem,function() {
      totalDropItem += this;
    });

    if (totalDropItem < desiredRandomPowerups) {
      canBeAdded = desiredRandomPowerups - totalDropItem;
    }

    // // Add more drop items to the total
    for (var z = 0; z < this.powerUpsName.length; z++) {
      for (var key in this.powerUpsName[z]) {
        if (key != 'tile') {
          if (canBeAdded > 1) {
            var currentDrop = this.powerUpsName[z][key].getDropItem();
            if (currentDrop < 1) {
              this.powerUpsName[z][key].setDropItem(currentDrop + 1);
            }
            canBeAdded--;
          }
        }
      }
    };

    // for (var z = 0; z < this.destroybleLayer.data.length; z++) {
    //   if (this.destroybleLayer.data[z] > 0) {
    //     // this.layer.data[z] = 5;
    //   }
    // };
  },

  getTotalPowerUps: function() {
    return this.totalPowerUps;
  },

  getCurrentLayer: function() {
    return this.layer;
  }
});