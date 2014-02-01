Powerups = Class.extend({

  totalDestroyableBlock : null,
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

	init: function(totalDestroyableBlock) {
    this.totalDestroyableBlock = totalDestroyableBlock;
    console.log('totalDestroyableBlock: ' + totalDestroyableBlock)
  },

  setup: function() {
    var totalDropChance    = 0;
    var accurateDropChance = 0;
    var dropChance         = [];
    var powerupsClasses    = [];

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
      // note: ensure that the percentage is at 100% not above or below
      accurateDropChance = powerupsClasses[j].getDropChance() / totalDropChance;
      powerupsClasses[j].setDropChance(accurateDropChance);
      // console.log(desiredRandomPowerups)
      console.log((desiredRandomPowerups / powerupsClasses[j].getDropChance()) / 100);
    };
  },

	getCurrentLayer: function() {
    return this.currentLayer;
	}
});