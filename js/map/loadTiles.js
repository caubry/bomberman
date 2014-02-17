LoadTiles = Class.extend({

  layers: [],
  powerups: null,
  mapLayers: {},

  dataNames: {
    none              : 0,
    destroyable_block : 1,
    grey_block        : 2,
    green_block       : 3,
    power_ups         : null
  },

  /**
  * Parse a JSON file created with Tile Map Editor 
  * and load the tileset.
  */
  init: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.loadTileset(data);
    });
  },

  /**
  * Iterate the layers and render each one
  */
  parseTiles: function(layers) {
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
      switch(currentLayer.name) {
        case config.STATIC_BLOCK : {
          this.mapLayers[config.STATIC_BLOCK] = currentLayer;

          // /*Grab the 'green' tiles data, save the safe areas
          // and add green tiles on top of these safe areas*/
          // for (var i = 0; i < currentLayer.data.length; i++) {
          //   if (currentLayer.data[i] === game.mapLevel.loadTiles.dataNames.green_block) {
          //     totalGreenTiles.push(currentLayer.data[i]);
          //   }
          //   else if (currentLayer.data[i] === game.mapLevel.loadTiles.dataNames.none) {
          //     safeZonesTiles.push(i);
          //     currentLayer.data[i] = game.mapLevel.loadTiles.dataNames.green_block;
          //   }
          // }
        }
        break;
        case config.GREEN_AREA: {
          this.mapLayers[config.GREEN_AREA] = currentLayer;
          // console.log(currentLayer)
          for (var z = 0; z < currentLayer.data.length; z++) {
            totalGreenTiles.push(currentLayer.data[z]);
          }
        }
        break;
        case config.SAFE_AREA: {
          this.mapLayers[config.SAFE_AREA] = currentLayer;
          // console.log(currentLayer)
        }
        break;
        case config.DESPICABLE_BLOCK: {
          this.mapLayers[config.DESPICABLE_BLOCK] = currentLayer;

          var staticLayer        = this.mapLayers[config.STATIC_BLOCK];
          var randomIndexesArray = [];
          var desiredIndex;
          
          // /*Determine how many blocks can be placed on the map, 
          // using the total amount of 'green' tiles*/
          currentMaxDestroyableBlock = utils.getRandomInt(
            (totalGreenTiles.length - 40), 
            (totalGreenTiles.length - 10)
          );

          console.log(currentMaxDestroyableBlock)

          // /*Add the 'green' tile area to the destroyable blocks
          // and remove any extra 'destroyable blocks' from the map*/
          // for (var w = 0; w < staticLayer.data.length; w++) {
          //   if (staticLayer.data[w] === game.mapLevel.loadTiles.dataNames.green_block){
          //       gameElement.push(w);
          //   }
          //   else currentLayer.data[w] = game.mapLevel.loadTiles.dataNames.none;
          // }

          // // Remove the safe zone areas from the destroyable blocks
          // for (var j = 0; j < safeZonesTiles.length; j++) {
          //   gameElement.splice(gameElement.indexOf(safeZonesTiles[j]), 1);
          // }

          // // Grab a random tile on every possible destroyable block
          // for (var n = 0; n < currentMaxDestroyableBlock; n++) {
          //     desiredIndex = utils.getRandomIntFromArray(gameElement);
          //     if (randomIndexesArray.indexOf(desiredIndex) > -1) n--;
          //     else randomIndexesArray.push(desiredIndex);
          // }

          // // Add the value of 'destroyable block' to the current layer data
          // for (var z = 0; z < randomIndexesArray.length; z++) {
          //   currentLayer.data[randomIndexesArray[z]] = game.mapLevel.loadTiles.dataNames.destroyable_block;
          // }
        }
        break;
        case config.POWER_UPS: {
          // this.mapLayers[config.POWER_UPS] = currentLayer;
          // // Generate and draw powerups on top of the 'green' tiles
          // game.mapLevel.loadTiles.powerups = new Powerups(this.mapLayers[config.POWER_UPS], this.mapLayers[config.DESPICABLE_BLOCK], currentMaxDestroyableBlock);
          // game.mapLevel.loadTiles.powerups.setup();
          // this.mapLayers[config.POWER_UPS] = game.mapLevel.loadTiles.powerups.getCurrentLayer();
        }
        break;
      }
    }
    mediator.call(mediatorEvent.TILES_LOADED, {data: game.mapLevel.loadTiles.data, layers: this.mapLayers, image: this.tileset});
  },

  /**
  * Construct an image for the tileset
  * and specify callback
  */
  loadTileset: function(data) { 
    this.data = data;
    this.tileset = $("<img />", { src: data.tilesets[0].image })[0];
    this.tileset.onload = $.proxy(this.parseTiles, this);
  }
  
});