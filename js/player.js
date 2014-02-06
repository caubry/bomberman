Player = Class.extend({

  sprites: [],
  frames: [],
  img: null,

  renderLayers: function(frames) {
    frames = $.isArray(frames) ? frames : this.data.frames;

    for(var key in frames) {
      sprite = frames[key];
      cx     = -sprite.frame.w * 0.5;
      cy     = -sprite.frame.h * 0.5;

      if (sprite.trimmed) {
        cx = sprite.spriteSourceSize.x - sprite.sourceSize.w * 0.5;
        cy = sprite.spriteSourceSize.y - sprite.sourceSize.h * 0.5;
      }

      this.defSprite(sprite.filename, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy);
    };
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

  loadPlayer: function(data) { 
    var sprite, cx, cy;
    this.data = data;
    this.sheet = $("<img />", { src: data.meta.image })[0]
    this.sheet.onload = $.proxy(this.renderLayers, this);
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
    var img = new Image();
    img.src = this.sheet.src;
    this.img  = img;
    this.__drawSpriteInternal(sprite, this.img, posX, posY);
    return;
  },

  __drawSpriteInternal: function(spt, sheet, posX, posY) {
    // console.log('MOVE')
    var hlf = {
      x: spt.cx,
      y: spt.cy
    };
    console.log(spt.x)
    game.ctx.drawImage(this.sheet, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
  }
});