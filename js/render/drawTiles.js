DrawTiles = Class.extend({

  layers: [],
  mapLayers: {},

  // Layers named from the json file
  STATIC_BLOCK          : "static-blocks",
  DESPICABLE_BLOCK      : "despicable-block",
  POWER_UPS             : "power-ups",
  DESPICABLE_COLLISION  : "despicable-collision",

  setup: function(mapLayers, data, tileset) {
    this.drawToMap(mapLayers, data, tileset);
  },

  /**
  * Draw to the canvas.
  */
  draw: function(layer, data, tileset) {
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    size = data.tilewidth;

    if (this.layers.length < data.layers.length) {
      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
        tile = data.tilesets[0];
        tile_idx--;        

        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = Math.floor(tile_idx / (tile.imagewidth / size)) * size;

        s_x = (i % layer.width) * size;
        s_y = Math.floor(i / layer.width) * size;

        game.ctx.drawImage(tileset, img_x, img_y, size, size, s_x, s_y, size, size);
      });
    }
  },

  // redraw: function() {
  //   this.drawToMap(this.mapLayers)
  // },

  drawToMap: function(mapLayers, data, tileset) {
    this.draw(mapLayers[this.STATIC_BLOCK], data, tileset);
    this.draw(mapLayers[this.POWER_UPS], data, tileset);
    this.draw(mapLayers[this.DESPICABLE_BLOCK], data, tileset);
  }
});