TextureManager = Class.extend({
  
  loadTexture: null,
  playerManager: null,

  setup: function () {
    this.loadTexture = new LoadTexture();
    this.loadTexture.setup(config.TEXTURE_DATA);
  },

  draw: function(loadedSprite) {
    this.playerManager = new PlayerManager();
    this.playerManager.setup(loadedSprite);
  }

});
