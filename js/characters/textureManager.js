TextureManager = Class.extend({
  
  loadTexture: null,
  playerManager: null,

  init: function () {
    this.loadTexture = new LoadTexture(config.TEXTURE_DATA);
  },

  draw: function(loadedSprite) {
    this.playerManager = new PlayerManager(loadedSprite);
  },

  updatePlayer: function() {
    this.playerManager.update();
  }

});
