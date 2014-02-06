Player = Class.extend({

  sprites: [],
  frames: [],
  img: null,
  imageMap: {},
  atlasImage:null,

  getImageData: function(filename) {
    return this.imageMap[filename];
  },

  defSprite: function (name, x, y, w, h, cx, cy) {
    var spt = {
      "id": name,
      "x": x,
      "y": y,
      "w": w,
      "h": h,
      "cx": cx === null ? 0 : cx,
      "cy": cy === null ? 0 : cy
    };
    this.sprites.push(spt);
    this.drawSprite(spt.id, spt.x, spt.y);
  },

  setImageData: function(filename, data) {
    var frame = data.frame;
    var cx, cy;

    cx     = -frame.w * 0.5;
    cy     = -frame.h * 0.5;

    if (data.trimmed) {
      cx = data.spriteSourceSize.x - data.sourceSize.w * 0.5;
      cy = data.spriteSourceSize.y - data.sourceSize.h * 0.5;
    }

    this.defSprite(filename, frame.x, frame.y, frame.w, frame.h, cx, cy);
  },

  onAtlasLoaded: function(frames) {
    frames = $.isArray(frames) ? frames : this.data.frames;
    for (var filename in frames) {
      this.setImageData(filename, frames[filename]);
    }
  },

  loadPlayer: function(data) {
    this.data = data;
    this.atlasImage = new Image();
    this.atlasImage.src = data.meta.image;
    this.atlasImage.onload = $.proxy(this.onAtlasLoaded, this);
  },

  load: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.loadPlayer(data);
    });
  },

  getStats: function (name) {
    for(var i = 0; i < this.sprites.length; i++) {
        if(this.sprites[i].id === name) {
          return this.sprites[i];
        }
    }
    return null;
  },

  drawSprite: function(spritename, posX, posY) {
    var sprite = this.getStats(spritename);
    this.__drawSpriteInternal(sprite, this.atlasImage, posX, posY);
    return;
  },

  __drawSpriteInternal: function(spt, sheet, posX, posY) {
    var hlf = {
      x: spt.cx,
      y: spt.cy
    };
    
    game.ctx.drawImage(sheet, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
  }
});