/**
* System Values
*/
var config = {

  STAGE_WIDTH       : 525,
  STAGE_HEIGHT      : 455,
  FPS               : 60,
  GAME_FONTS        : "bold 20px sans-serif",
  
  // Canvas wrapper that also includes UI elements.
  GAME_CONTENT_ID   : "gameContent",
  GAME_CANVAS_ID    : "gameCanvas",

  MAP_DATA        : "data/map/map-level2.json",
  TEXTURE_DATA    : "data/map/character.json",

  // Map layers
  GREEN_AREA            : "green-area",
  STATIC_BLOCK          : "static-blocks",
  DESPICABLE_BLOCK      : "despicable-block",
  POWER_UPS             : "power-ups",
  SAFE_AREA             : "safe-area",

  // User input
  PLAYER_UP       : 'move-up',
  PLAYER_LEFT     : 'move-left',
  PLAYER_DOWN     : 'move-down',
  PLAYER_RIGHT    : 'move-right',

  // Players custom properties
  PLAYER_PROPERTIES: {
    player_one: {
      position: {
        x: 48,
        y: 38
      },
      scale: {
        x: 1.8,
        y: 1.8
      }
    },
    player_two: {},
    player_three: {},
    player_four: {}
  },

};
