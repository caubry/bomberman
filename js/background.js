/**
* 
*/
Background = Class.extend({

  layers: [],

  /**
  * Draw to the canvas.
  */
  drawTiles: function(layer) {
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    size = game.background.data.tilewidth;

    if (game.background.layers.length < game.background.data.layers.length) {
      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
        tile = game.background.data.tilesets[0];
        tile_idx--;        

        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = Math.floor(tile_idx / (tile.imagewidth / size)) * size;

        s_x = (i % layer.width) * size;
        s_y = Math.floor(i / layer.width) * size;
        game.ctx.drawImage(game.background.tileset, img_x, img_y, size, size, s_x, s_y, size, size);
      });
    }
  },

  /**
  * From the JSON file data, set the properties of each layer
  */
  renderLayer: function(layer) {
    for (var key in layer)
    {
      switch(layer[key]) {
        case "static-blocks": {
          game.background.drawTiles(layer);
        }
        break;
        case "despicable-block": {
          console.log('despicable-block: ')
          layer.data[1] = 1;
          layer.data[2] = 1;
          layer.data[3] = 1;
          console.log(layer.data[1])
          if (layer.type !== "tilelayer" || !layer.opacity) { return; }
          size = game.background.data.tilewidth;

          if (game.background.layers.length < game.background.data.layers.length) {
            layer.data.forEach(function(tile_idx, i) {
              if (!tile_idx) { return; }
              var img_x, img_y, s_x, s_y,
              tile = game.background.data.tilesets[0];
              tile_idx--;        

              img_x = (tile_idx % (tile.imagewidth / size)) * size;
              img_y = Math.floor(tile_idx / (tile.imagewidth / size)) * size;

              s_x = (i * 1 % layer.width) * size;
              s_y = (i * 1 % layer.width) * size;
              game.ctx.drawImage(game.background.tileset, img_x, img_y, size, size, s_x, s_y, size, size);
            });
          }
        }
        break;
        case "despicable-collision": {
          console.log('despicable-collision')
        }
        break;
        }
    }
  },

  /**
  * Iterate the layers and render each one
  */
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
    $.getJSON(config.MAP_DATA, function(data) {
      _this.loadTileset(data);
    });
  }
});

