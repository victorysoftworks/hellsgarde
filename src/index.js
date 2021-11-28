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
  rogue.addComponent(new RenderableComponent(64, 0x588d71, Layer.Rogue))
  rogue.addComponent(new PositionComponent(7, 17))
  rogue.addComponent(new SolidComponent())
  rogue.addComponent(new TemporaryComponent(new BleedingComponent(), 20))
  rogue.addComponent(new ActorComponent([
    new PlayerControlledBehavior()
  ]))
  
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
  entrance.addComponent(new NameComponent('dungeon entrance'))
  entrance.addComponent(new PositionComponent(7, 18))
  entrance.addComponent(new RenderableComponent(234, 0x736598, Layer.Terrain))
  entrance.addComponent(new HardnessComponent(100))
  entrance.addComponent(new CollisionTriggerComponent(
    new PostMessageEffect(`A magical force repels you from the entrance`),
    e => e.query('rogue')
  ))
  
  const amulet = new Entity()
  amulet.addComponent(new NameComponent('Amulet of Yendor'))
  amulet.addComponent(new PositionComponent(18, 11))
  amulet.addComponent(new RenderableComponent(12, 0xffeaa7, Layer.Item))
  amulet.addComponent(new HardnessComponent(100))

  const marilith = new Entity()
  marilith.addComponent(new NameComponent('marilith'))
  marilith.addComponent(new PositionComponent(12, 8))
  marilith.addComponent(new RenderableComponent(77, 0xd24d57, Layer.Monster))
  marilith.addComponent(new SolidComponent())
  marilith.addComponent(new HardnessComponent(50))
  marilith.addComponent(new ActorComponent([
    new WanderBehavior()
  ]))

  const statue1 = new Entity()
  statue1.addComponent(new NameComponent('statue'))
  statue1.addComponent(new PositionComponent(6, 12))
  statue1.addComponent(new RenderableComponent(38, 0x666666, Layer.Terrain))
  statue1.addComponent(new SolidComponent())
  statue1.addComponent(new HardnessComponent(100))

  const statue2 = new Entity()
  statue2.addComponent(new NameComponent('statue'))
  statue2.addComponent(new PositionComponent(8, 12))
  statue2.addComponent(new RenderableComponent(38, 0x666666, Layer.Terrain))
  statue2.addComponent(new SolidComponent())
  statue2.addComponent(new HardnessComponent(100))

  const water1 = new Entity()
  water1.addComponent(new NameComponent('shallow water'))
  water1.addComponent(new PositionComponent(3, 3))
  water1.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water1.addComponent(new WaterComponent())
  water1.addComponent(new HardnessComponent(10))

  const water2 = new Entity()
  water2.addComponent(new NameComponent('shallow water'))
  water2.addComponent(new PositionComponent(4, 3))
  water2.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water2.addComponent(new WaterComponent())
  water2.addComponent(new HardnessComponent(10))

  const water3 = new Entity()
  water3.addComponent(new NameComponent('shallow water'))
  water3.addComponent(new PositionComponent(5, 3))
  water3.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water3.addComponent(new WaterComponent())
  water3.addComponent(new HardnessComponent(10))

  const water4 = new Entity()
  water4.addComponent(new NameComponent('shallow water'))
  water4.addComponent(new PositionComponent(3, 4))
  water4.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water4.addComponent(new WaterComponent())
  water4.addComponent(new HardnessComponent(10))

  const water5 = new Entity()
  water5.addComponent(new NameComponent('shallow water'))
  water5.addComponent(new PositionComponent(4, 4))
  water5.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water5.addComponent(new WaterComponent())
  water5.addComponent(new HardnessComponent(10))

  const water6 = new Entity()
  water6.addComponent(new NameComponent('shallow water'))
  water6.addComponent(new PositionComponent(5, 4))
  water6.addComponent(new RenderableComponent(176, 0x59abe3, Layer.Terrain))
  water6.addComponent(new WaterComponent())
  water6.addComponent(new HardnessComponent(10))

  const maxGrass = 64
  for (let i = 0; i < maxGrass; i++) {
    let x = Random.number(0, Game.map.terrain[0].length - 1)
    let y = Random.number(0, Game.map.terrain.length - 1)

    if (Game.map.terrain[y][x] === 250) {
      // Only place grass over floor
      const grass = new Entity()
      const color = Random.choice([0x324a3e, 0x324a3e, 0x324a3e, 0x49525c])
      grass.addComponent(new PositionComponent(x, y))
      grass.addComponent(new RenderableComponent(249, color, Layer.Floor))
      grass.addComponent(new HardnessComponent(0))
      Game.entityManager.addEntity(grass)
    }
  }

  Game.entityManager.addEntities([
    rogue, 
    entrance, 
    amulet, 
    marilith, 
    statue1, 
    statue2,
    water1,
    water2,
    water3,
    water4,
    water5,
    water6
  ])

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
      config.tileset.tileHeight,
      config.screen.width,
      config.screen.height
    )
  })

})()