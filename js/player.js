Player = Class.extend({

  renderPlayer: function(frames) {
    frames = $.isArray(frames) ? frames : this.data.frames;
    console.log(frames)
  },

  loadPlayer: function(data) { 
    this.data = data;
    for (var i = 0; i < data.frames.length; i++) {
      this.tileset = $("<img />", { src: data.frames[i].filename })[0]
    };
    this.tileset.onload = $.proxy(this.renderPlayer, this);
  },

  load: function(jsonFile) {
    var _this = this;
    $.getJSON(jsonFile, function(data) {
      _this.loadPlayer(data);
    });
  }

});