TextureManager = Class.extend({
  
  loadTexture: null,
  playerManager: null,

  init: function () {
    this.loadTexture = new LoadTexture(config.TEXTURE_DATA);
  },

  draw: function(loadedSprite, staticBlockInfo) {
    this.playerManager = new PlayerManager(loadedSprite);
    this.playerManager.update(staticBlockInfo);
  },

});
