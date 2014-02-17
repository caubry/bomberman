MapLevel = Class.extend({
    
  loadTiles: null,
  drawTiles: null,

  init: function () {
    this.loadTiles = new LoadTiles(config.MAP_DATA);
  },

  tilesLoaded: function(loadedMap) {
    this.drawTiles = new DrawTiles(loadedMap);
  },

  draw: function(layer) {
    this.drawTiles.redraw(layer);
  },

  addToBombLayer: function(tileInfo) {
    var _this = this;
    var lifespan = 3;
    var counter = 0;
    var setTime;
    this.drawTiles.redrawBombLayer(tileInfo);
    (function removeBombs() {
      setTime = setTimeout(function() {
        counter++;
        if (counter >= lifespan * config.FPS) {
          _this.drawTiles.removeBomb(tileInfo);
          clearTimeout(setTime);
        }
        requestAnimationFrame(removeBombs, _this.addToBombLayer);
      }, 1000 / config.FPS);
    })();
  },

  getLayerInfo: function(layer) {
    return this.drawTiles.getLayerInfo(layer);
  }

});