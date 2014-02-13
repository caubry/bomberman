LoadTexture = Class.extend({

  sprites: {},
  playerAction: {},
  keyPress: 0,
  atlasImage: null,

  /**
  * Parse a JSON file created with the TexturePacker tool
  * and load the atlas.
  */
  init: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.parseJSON(data);
    });
  },

  /**
  * Create an image for the atlas
  */
  parseJSON: function(data) {
    this.data = data;
    this.atlasImage = $("<img />", { src: data.meta.image })[0];
    this.atlasImage.onload = $.proxy(this.onAtlasLoaded, this);
  },

  /**
  * Create an image for the atlas
  */
  onAtlasLoaded: function(frames) {
    frames = $.isArray(frames) ? frames : this.data.frames;
    for (var filename in frames) {
      this.setImageData(filename, frames[filename]);
    }
    mediator.call(mediatorEvent.TEXTURE_LOADED, {sprites: this.sprites, atlasName: this.atlasImage});
  },

  /**
  * Calculate the x and y coordinates 
  * of the center of the sprite
  */
  setImageData: function(filename, data) {
    var frame = data.frame;
    var cx, cy;

    cx = -frame.w * 0.5;
    cy = -frame.h * 0.5;

    if (data.trimmed) {
      cx = data.spriteSourceSize.x - data.sourceSize.w * 0.5;
      cy = data.spriteSourceSize.y - data.sourceSize.h * 0.5;
    }
    // Remove image extension from the filename
    var actionName = data.filename.substr(0, data.filename.lastIndexOf('.'));
    this.defSprite(actionName, frame.x, frame.y, frame.w, frame.h, cx, cy);
  },
  
  /**
  * Define sprites properties
  */
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

    this.sprites[spt.id] = [];
    this.sprites[spt.id].push(spt);
  }
});