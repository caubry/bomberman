ExtraBomb = PowerEntity.extend({
  dropChance: 90,

  init: function() {
    this._super();
	},

  getDropChance: function() {
    return this.dropChance;
  },

  setDropChance: function(drop) {
    this.dropChance = drop;
  }

});