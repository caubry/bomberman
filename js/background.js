/**
* 
*/
Background = Class.extend({

  layers: [],

  renderLayer: function(layer) {
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    size = game.background.data.tilewidth;

    if (game.background.layers.length < game.background.data.layers.length) {
      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
        
        tile = game.background.data.tilesets[0];
        tile_idx--;
        
        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
        
        s_x = (i % layer.width) * size;
        s_y = ~~(i / layer.width) * size;
       
        game.ctx.drawImage(game.background.tileset, img_x, img_y, size, size,
                    s_x, s_y, size, size);
      });
      
      game.background.layers.push(game.ctx.canvas.toDataURL());
      game.ctx.drawImage(game.ctx.canvas, 0, 0);
    }
  },

  renderLayers: function(layers) {
    layers = $.isArray(layers) ? layers : this.data.layers;
    layers.forEach(this.renderLayer);
  },

  /**
  * Construct an image for the tileset
  * and specify callback
  */
  loadTileset: function(data) { 
    this.data = data;
    this.tileset = $("<img />", { src: data.tilesets[0].image })[0]
    this.tileset.onload = $.proxy(this.renderLayers, this);
  },

  /**
  * Parse a JSON file created with Tile Map Editor 
  * and load the tileset.
  */
  load: function(name) {
    var _this = this;
    $.getJSON("/tilesets/" + name + ".json", function(data) {
      _this.loadTileset(data);
    });
  }
});

