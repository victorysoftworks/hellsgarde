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
  rogue.addComponent(new RogueComponent())
  rogue.addComponent(new RenderableComponent(64, 0x588d71))
  rogue.addComponent(new PositionComponent(7, 17))
  rogue.addComponent(new SolidComponent())
  
  /****************************************************************************
   * Start game.
   ***************************************************************************/

  Game.start()

  /****************************************************************************
   * FIXME: Remove this when done testing.
   * 
   * Add initial entities to game world.
   ***************************************************************************/

  const entrance = new Entity()
  entrance.addComponent(new PositionComponent(7, 18))
  entrance.addComponent(new RenderableComponent(234, 0x666666))
  
  const amulet = new Entity()
  amulet.addComponent(new PositionComponent(18, 11))
  amulet.addComponent(new RenderableComponent(12, 0xffeaa7))

  const marilith = new Entity()
  marilith.addComponent(new PositionComponent(12, 8))
  marilith.addComponent(new RenderableComponent(77, 0xd24d57))
  marilith.addComponent(new SolidComponent())

  const statue1 = new Entity()
  statue1.addComponent(new PositionComponent(6, 12))
  statue1.addComponent(new RenderableComponent(38, 0x666666))
  statue1.addComponent(new SolidComponent())

  const statue2 = new Entity()
  statue2.addComponent(new PositionComponent(8, 12))
  statue2.addComponent(new RenderableComponent(38, 0x666666))
  statue2.addComponent(new SolidComponent())

  Game.entityManager.addEntities([rogue, entrance, amulet, marilith, statue1, statue2])

  /****************************************************************************
   * Render to screen.
   ***************************************************************************/

  const phaser = new Phaser.Game({
    type: Phaser.AUTO,
    width: config.screen.width * config.tileset.tileWidth,
    height: config.screen.height * config.tileset.tileHeight,
    backgroundColor: config.screen.color,
    scene: new MainScene(
      config.tileset.tileWidth,
      config.tileset.tileHeight
    )
  })

})()