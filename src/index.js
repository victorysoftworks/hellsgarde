/******************************************************************************
 * Run game.
 *****************************************************************************/

(async () => {

  /****************************************************************************
   * Load configuration file.
   ***************************************************************************/

  const config = await fetch('./data/config.json')
    .then(response => response.json())

  /****************************************************************************
   * Set HTML page (not scene) background color.
   ***************************************************************************/

  document.querySelector('body').style.backgroundColor = config.screen.color

  /****************************************************************************
   * Create Rogue.
   ***************************************************************************/
  
  const rogue = new Entity()
  rogue.addComponent(new RenderableComponent(2, 0xbe90d4))
  rogue.addComponent(new PositionComponent(7, 17))
  
  /****************************************************************************
   * Start game.
   ***************************************************************************/

  const map = new Map()
  const game = new Game({
    type: Phaser.AUTO,
    width: config.screen.width * config.tileset.tileWidth,
    height: config.screen.height * config.tileset.tileHeight,
    backgroundColor: config.screen.color,
    scene: new MainScene(
      config.tileset.tileWidth,
      config.tileset.tileHeight,
      rogue,
      map
    )
  })

})()