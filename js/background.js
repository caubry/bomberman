/**
* 
*/
Background = Class.extend({

  layers: [],

  STATIC_BLOCK          : "static-blocks",
  DESPICABLE_BLOCK      : "despicable-block",
  DESPICABLE_COLLISION  : "despicable-collision",

  dataNames: {
    none              : 0,
    destroyable_block : 1,
    grey_block        : 2,
    green_block       : 3
  },

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
  * Iterate the layers and render each one
  */
  renderLayers: function(layers) {
    layers = $.isArray(layers) ? layers : this.data.layers;

    var totalGreenTiles = [];
    var greenBlock      = {};
    var currentMaxDestroyableBlock;

    for (var key in layers) {
      var currentLayer = layers[key];
      switch(currentLayer['name']) {
        case game.background.STATIC_BLOCK: {
          var currentTile = game.background.dataNames['green_block'];
          for (var i = 0; i < currentLayer.data.length; i++) {
            if (currentLayer.data[i] === currentTile) {
              greenBlock[i] = currentLayer.data[i];
              // Keep a track on the total number of 'green tiles'
              totalGreenTiles.push(currentLayer.data[i]);
            }
          }
          for (var number in currentLayer.data) {
            if (currentLayer.data[number] === 0) {
              currentLayer.data[number] = game.background.dataNames['green_block'];
            }
          }
          game.background.drawTiles(currentLayer);
        }
        break;
        case game.background.DESPICABLE_BLOCK: {
          currentMaxDestroyableBlock = utils.getRandomInt((totalGreenTiles.length - 50), (totalGreenTiles.length - 10));
          var blocksToBeRemoved       = totalGreenTiles.length - currentMaxDestroyableBlock;
          var desiredIndex;
          for (var i = 0; i < currentLayer.data.length; i++) {
            if (greenBlock[i]) {
              desiredIndex = Math.floor(Math.random() * currentLayer.data.length);
              currentLayer.data[i] = game.background.dataNames['destroyable_block'];
            }
            else {
              currentLayer.data[i] = game.background.dataNames['none'];
              currentLayer.data[desiredIndex] = game.background.dataNames['none'];
            }
          }
          game.background.drawTiles(currentLayer);
        }
        break;
        case game.background.DESPICABLE_COLLISION: {
          console.log('despicable-collision')
        }
        break;
      }
    }
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

