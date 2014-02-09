DrawTiles = Class.extend({

  layers: [],
  layer: [],
  mapLayers: {},
  tileset: null,
  data: null,

  // Layers named from the json file
  STATIC_BLOCK          : "static-blocks",
  DESPICABLE_BLOCK      : "despicable-block",
  POWER_UPS             : "power-ups",
  DESPICABLE_COLLISION  : "despicable-collision",

  setup: function(data, layer, tileset) {
    this.tileset = tileset;
    this.data    = data;
    this.layer   = layer;

    this.drawToMap();
  },

  redraw: function() {
    this.draw(this.layer[this.STATIC_BLOCK]);
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

        game.ctx.drawImage(_this.tileset, img_x, img_y, size, size, s_x, s_y, size, size);
      });
    }
  },

  drawToMap: function() {
    this.draw(this.layer[this.STATIC_BLOCK]);
    this.draw(this.layer[this.POWER_UPS]);
    this.draw(this.layer[this.DESPICABLE_BLOCK]);
  }
});