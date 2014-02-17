/**
* System Values
*/
var config = {

  STAGE_WIDTH       : 525,
  STAGE_HEIGHT      : 455,
  FPS               : 60,
  GAME_FONTS        : "bold 20px sans-serif",
  TILE_WIDTH        : 35,
  TILE_HEIGHT       : 35,
  
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
  PLAYER_BOMB     : 'spacebar',

  // Players custom properties
  PLAYER_PROPERTIES: {
    player_one: {
      position: {
        x: 44,
        y: 29 
      },
      scale: {
        x: 2.2,
        y: 2.2
      }
    },
    player_two: {},
    player_three: {},
    player_four: {}
  },

  PLAYER_SPEED: 1.5,

  HITBOX_WALLS: {
    player_one: {
      position: {
        x: 5,
        y: -10,
        w: 25,
        h: 28
      }
    }
  }

};
