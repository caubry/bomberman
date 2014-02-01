RemoteControl = PowerEntity.extend({
  dropChance: 5,
  dropNumber: null,

  init: function() {
    this._super();
	},

  setDropItem: function(dropNumber) {
    this.dropNumber = dropNumber;
  },

  getDropItem: function() {
    return this.dropNumber;
  },

  getDropChance: function() {
    return this.dropChance;
  },

});