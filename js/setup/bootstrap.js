var utils;
var mediator;
var game;
/**
* Create a canvas element and return it.
*/
var buildCanvas = function() {
  var canvas = document.createElement("canvas");
  // Error message for unsupported browsers.
  canvas.innerHTML  = "<p>Please upgrade your browser to support HTML5.</p> \
                       <p>One recommendation is to install the latest Chrome or Firefox.</p>";
  canvas.id     = config.GAME_CANVAS_ID;
  canvas.width  = config.STAGE_WIDTH;
  canvas.height = config.STAGE_HEIGHT;
  canvas.focus();

  return canvas;
};

/**
* Bootstrap the application.
* Load the necessary components and run.
*/
var setup = function() {
  var body = document.getElementById("body");
  var div  = document.createElement("div");
  
  utils    = new Utils();
  mediator = new Mediator();

  if(div) {
    div.id = config.GAME_CONTENT_ID;
    try {
      var canvas = buildCanvas();
      body.appendChild(canvas);   
      // Run game.
      game = new Game(canvas);
      game.setup();
    } catch (e) {
      document.write(e);
    }
  }
};
window.onload = setup;