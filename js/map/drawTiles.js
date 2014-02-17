DrawTiles = Class.extend({

  layers: [],
  data: null,
  layer: null,
  image: null,
  tileInfo: {},
  savedBomb: [],

  layersOrdered: [
    config.DESPICABLE_BLOCK,
    config.STATIC_BLOCK,
    config.GREEN_AREA
  ],

  init: function(loadedMap) {
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
    var _this         = this;
    var rectangleInfo = {};

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
        rectangleInfo = {
          x: s_x, 
          y: s_y,
          w: size,
          h: size
        };

        if(!_this.tileInfo[layer.name]) {
          _this.tileInfo[layer.name] = [];
        }
        
        _this.tileInfo[layer.name].push(rectangleInfo);
      });
    }
  },

  redrawBombLayer: function(tileInfo) {
    this.savedBomb.push(tileInfo);
    this.drawBomb();
  },

  removeBomb: function(tileInfo) {
    for (var z = 0; z < this.savedBomb.length; z++) {
      if (this.savedBomb[z].x === tileInfo.x &&
          this.savedBomb[z].y === tileInfo.y) {
        this.savedBomb.splice(z, 0);
      }
    };
    this.drawBomb();
  },

  drawBomb: function() {
    for (var i = 0; i < this.savedBomb.length; i++) {
      game.ctx.drawImage(this.image, 105, 0, 35, 35, this.savedBomb[i].x, this.savedBomb[i].y, 35, 35);
    };
  },

  getLayerInfo: function(layerName) {
    return this.tileInfo[layerName];
  } 
});