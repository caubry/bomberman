Map = Class.extend({

  layers: [],
  powerups: null,
  mapLayers: {},

  // Layers named from the json file
  STATIC_BLOCK          : "static-blocks",
  DESPICABLE_BLOCK      : "despicable-block",
  POWER_UPS             : "power-ups",
  DESPICABLE_COLLISION  : "despicable-collision",

  dataNames: {
    none              : 0,
    destroyable_block : 1,
    grey_block        : 2,
    green_block       : 3,
    power_ups         : null
  },

  /**
  * Draw to the canvas.
  */
  drawTiles: function(layer) {
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    size = game.map.data.tilewidth;

    if (game.map.layers.length < game.map.data.layers.length) {
      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
        tile = game.map.data.tilesets[0];
        tile_idx--;        

        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = Math.floor(tile_idx / (tile.imagewidth / size)) * size;

        s_x = (i % layer.width) * size;
        s_y = Math.floor(i / layer.width) * size;

        game.ctx.drawImage(game.map.tileset, img_x, img_y, size, size, s_x, s_y, size, size);
      });
    }
  },

  redraw: function() {
    this.drawToMap(this.mapLayers)
  },

  drawToMap: function(mapLayers) {
    game.map.drawTiles(mapLayers[game.map.STATIC_BLOCK]);
    game.map.drawTiles(mapLayers[game.map.POWER_UPS]);
    game.map.drawTiles(mapLayers[game.map.DESPICABLE_BLOCK]);
  },

  /**
  * Iterate the layers and render each one
  */
  renderLayers: function(layers) {
    layers = $.isArray(layers) ? layers : this.data.layers;
    // Keep a track on the total number of 'green tiles'
    var totalGreenTiles = [];
    // Safe areas for the characters, when spawning
    var safeZonesTiles  = [];
    // Store areas where blocks and power-ups can be placed
    var gameElement     = [];
    // Total of destroyable blocks
    var currentMaxDestroyableBlock;

    for (var key in layers) {
      var currentLayer = layers[key];

      switch(currentLayer['name']) {
        case game.map.STATIC_BLOCK: {
          this.mapLayers[game.map.STATIC_BLOCK] = currentLayer;

          /*Grab the 'green' tiles data, save the safe areas
          and add green tiles on top of these safe areas*/
          for (var i = 0; i < currentLayer.data.length; i++) {
            if (currentLayer.data[i] === game.map.dataNames['green_block']) {
              totalGreenTiles.push(currentLayer.data[i]);
            }
            else if (currentLayer.data[i] === game.map.dataNames['none']) {
              safeZonesTiles.push(i);
              currentLayer.data[i] = game.map.dataNames['green_block'];
            }
          }
        }
        break;
        case game.map.DESPICABLE_BLOCK: {
          this.mapLayers[game.map.DESPICABLE_BLOCK] = currentLayer;

          var staticLayer        = this.mapLayers[game.map.STATIC_BLOCK];
          var randomIndexesArray = [];
          var desiredIndex;
          
          /*Determine how many blocks can be placed on the map, 
          using the total amount of 'green' tiles*/
          currentMaxDestroyableBlock = utils.getRandomInt(
            (totalGreenTiles.length - 40), 
            (totalGreenTiles.length - 10)
          );

          /*Add the 'green' tile area to the destroyable blocks
          and remove any extra 'destroyable blocks' from the map*/
          for (var w = 0; w < staticLayer.data.length; w++) {
            if (staticLayer.data[w] === game.map.dataNames['green_block']){
                gameElement.push(w);
            }
            else currentLayer.data[w] = game.map.dataNames['none'];
          };

          // Remove the safe zone areas from the destroyable blocks
          for (var j = 0; j < safeZonesTiles.length; j++) {
            gameElement.splice(gameElement.indexOf(safeZonesTiles[j]), 1);
          };

          // Grab a random tile on every possible destroyable block
          for (var i = 0; i < currentMaxDestroyableBlock; i++) {
              desiredIndex = utils.getRandomIntFromArray(gameElement);
              if (randomIndexesArray.indexOf(desiredIndex) > -1) i--;
              else randomIndexesArray.push(desiredIndex);
          };

          // Add the value of 'destroyable block' to the current layer data
          for (var z = 0; z < randomIndexesArray.length; z++) {
            currentLayer.data[randomIndexesArray[z]] = game.map.dataNames['destroyable_block'];
          };
        }
        break;
        case game.map.POWER_UPS: {
          this.mapLayers[game.map.POWER_UPS] = currentLayer;
          // Generate and draw powerups on top of the 'green' tiles
          game.map.powerups = new Powerups(this.mapLayers[game.map.POWER_UPS], this.mapLayers[game.map.DESPICABLE_BLOCK], currentMaxDestroyableBlock);
          game.map.powerups.setup();
          this.mapLayers[game.map.POWER_UPS] = game.map.powerups.getCurrentLayer();
        }
        break;
        case game.map.DESPICABLE_COLLISION: {
          this.mapLayers[game.map.DESPICABLE_COLLISION] = currentLayer;
          console.log('despicable-collision')
        }
        break;
      }
    }
    this.drawToMap(this.mapLayers);
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
  load: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.loadTileset(data);
    });
  }
});

