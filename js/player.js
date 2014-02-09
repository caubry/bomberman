Player = Class.extend({

  sprites: {},
  atlasImage:null,
  xSpeed: 48,
  ySpeed: 32,
  keyPress: 0,
  movement: {
    RIGHT: 'move-right',
    LEFT: 'move-left',
    UP: 'move-up',
    DOWN: 'move-down'
  },
  i: 1,
  currentPlayerWalkFront: null,

  /**
  * Parse a JSON file created with the TexturePacker tool
  * and load the atlas.
  */
  load: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.loadPlayer(data);
    });
  },

  /**
  * Draw on canvas
  */
  draw: function(name, xPos, yPos) {
    var currentImage;
    var hlf;
    var scaleX = 1.8;
    var scaleY = 1.8;

    for (var key in this.sprites[name]) {
      currentImage = this.sprites[name][key];

      hlf = {
        x: currentImage.cx,
        y: currentImage.cy
      };

      game.ctx.drawImage(this.atlasImage, currentImage.x, currentImage.y, 
        currentImage.w, currentImage.h, xPos + hlf.x, yPos + hlf.y, 
        currentImage.w * scaleX, currentImage.h * scaleY
      );
    };
  },

  /**
  * Move character around the map
  */
  move: function(movement) {
    if (movement === this.movement.RIGHT) {
      this.xSpeed++;
    } else if (movement === this.movement.LEFT) {
      this.xSpeed--;
    }
    if (movement === this.movement.UP) {
      this.ySpeed--;
    } else if (movement === this.movement.DOWN) {
      this.ySpeed += 2;
      if (this.keyPress > 3) {
        if (this.i > 2) this.i = 1;
        else this.i++;
        this.keyPress = 0;
      }
      else this.keyPress++;
      console.log(this.keyPressx)
    }
    this.currentPlayerWalkFront = 'Player1_Walk_Front' + this.i;
    this.draw(this.currentPlayerWalkFront, this.xSpeed, this.ySpeed);
  },

  onKeyUp: function(movement) {
    if (movement === this.movement.DOWN) {
      this.draw('Player1_Walk_Front1', this.xSpeed, this.ySpeed);
    }
  },

  listenInput: function() {
    for (var key in game.inputEngine.actions) {
      console.log(key)
    }

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
    var newFilename = data.filename.substr(0, data.filename.lastIndexOf('.'));
    this.defSprite(newFilename, frame.x, frame.y, frame.w, frame.h, cx, cy);
  },

  /**
  * Create an image for the atlas
  */
  onAtlasLoaded: function(frames) {
    frames = $.isArray(frames) ? frames : this.data.frames;
    for (var filename in frames) {
      this.setImageData(filename, frames[filename]);
    };
    /*TODO: Normalise player position with tiles
    and store image name*/ 
    this.draw('Player1_Walk_Front1', 48, 32);
  },

  /**
  * Create an image for the atlas
  */
  loadPlayer: function(data) {
    this.data = data;
    this.atlasImage = $("<img />", { src: data.meta.image })[0]
    this.atlasImage.onload = $.proxy(this.onAtlasLoaded, this);
  }
});