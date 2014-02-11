MapLevel = Class.extend({
    
  loadTiles: null,
  drawTiles: null,

  setup: function () {
    this.loadTiles = new LoadTiles();
    this.loadTiles.setup(config.MAP_DATA);
  },

  tilesLoaded: function(loadedMap) {
    this.drawTiles = new DrawTiles();
    this.drawTiles.setup(loadedMap);
  },

  draw: function(layer) {
    this.drawTiles.redraw(layer);
  }

});