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
  }

});