var mediatorEvent = {

  /*@no Params 
  Called by InputEngine, when user press Key up
  Retrieved by Game*/
  KEY_UP: 'KEY_UP',

  /*@no Params 
  Called by InputEngine, when user press Key down
  Retrieved by Game*/
  KEY_DOWN: 'KEY_DOWN',

  // -----------------------------------------------------

  /*@Params: {data, layers, image}
  Called by LoadTiles, when JSON file has been parsed
  Retrieved by Game*/
  TILES_LOADED: 'onTiledLoaded',

  /*@no Params 
  Called by DrawTiles, when tiles have been rendered
  Retrieved by Game*/
  TILES_RENDERED: 'onTiledRendered',

  // -----------------------------------------------------

  /*@Params: sprite
  Called by LoadTexture, when JSON file has been parsed
  Retrieved by Game*/
  TEXTURE_LOADED: 'onTextureLoaded',

  // -----------------------------------------------------

  /*@no Params
  Called by DrawPlayer, when player has been rendered
  Retrieved by Game*/
  PLAYER_RENDERED: 'onPlayerRendered'

};


