DrawTiles = Class.extend({

  layers: [],
  data: null,
  layer: null,
  image: null,

  layersOrdered: [
    config.STATIC_BLOCK,
    config.POWER_UPS,
    config.DESPICABLE_BLOCK
  ],

  setup: function(loadedMap) {
    this.data  = loadedMap.data;
    this.layer = loadedMap.layers;
    this.image = loadedMap.image;

    this.drawToMap();
  },

  redraw: function(layerName) {
    this.draw(this.layer[layerName]);
  },

  drawToMap: function() {
    for (var i = 0; i < this.layersOrdered.length; i++) {
      this.draw(this.layer[this.layersOrdered[i]]);
    }

    mediator.call(mediatorEvent.TILES_RENDERED);
  },

  draw: function(layer) {
    var _this = this;
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    size = this.data.tilewidth;
    if (this.layers.length < this.data.layers.length) {
      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
        tile = _this.data.tilesets[0];
        tile_idx--;        

        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = Math.floor(tile_idx / (tile.imagewidth / size)) * size;

        s_x = (i % layer.width) * size;
        s_y = Math.floor(i / layer.width) * size;

        game.ctx.drawImage(_this.image, img_x, img_y, size, size, s_x, s_y, size, size);
      });
    }
  },
});