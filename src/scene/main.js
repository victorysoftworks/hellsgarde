class MainScene extends Phaser.Scene {
  constructor(frameWidth, frameHeight, rogue, map) {
    super()

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.rogue = rogue
    this.map = map
    this.cursors = null
    this.entities = []
  }

  preload() {
    this.load.json('ascii', './data/ascii.json')
    this.load.spritesheet('ascii', 
      './data/ascii.png',
      {
        frameWidth: this.frameWidth,
        frameHeight: this.frameHeight
      }
    )
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
  
    const sprites = this.cache.json.get('ascii')

    // Add other entities

    const amulet = new Entity()
    amulet.addComponent(new PositionComponent(18, 11))
    amulet.addComponent(new RenderableComponent(12, 0xffeaa7))
    this.entities.push(amulet)

    const marilith = new Entity()
    marilith.addComponent(new PositionComponent(12, 8))
    marilith.addComponent(new RenderableComponent(77, 0xd63031))
    this.entities.push(marilith)
  
    // Draw floor

    const position = this.rogue.query('position')
    const glyph = this.rogue.query('glyph')
    const color = this.rogue.query('color')
  
    for (let y = 0; y < this.map.terrain.length; y++) {
      for (let x = 0; x < this.map.terrain[y].length; x++) {
        let tint
  
        switch (this.map.terrain[y][x]) {
          case 250:
            tint = 0x2a2a2a
            break
          case 43:
            tint = 0xe67e22
            break
          default:
            tint = 0x666666
            break
        }
        
        if (x !== position.x || y !== position.y)
          this.add.image(x * 32, y * 32, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
      }
    }

    // Draw other entities

    this.entities.forEach(e => {
      let p = e.query('position')
      let g = e.query('glyph')
      let c = e.query('color')

      this.add.image(p.x * 32, p.y * 32, 'ascii', g).setOrigin(0, 0).setTint(c)
    })
  
    // Draw rogue
    
    const x1 = position.x * 32
    const y1 = position.y * 32
    this.add.image(x1, y1, 'ascii', glyph).setOrigin(0, 0).setTint(color)
  }

  update() {
    let currentPosition = this.rogue.query('position')
    let moved = false
  
    if (this.cursors.left.isDown) {
      this.rogue.receive('move', { x: currentPosition.x - 1, y: currentPosition.y })
      moved = true
    } else if (this.cursors.right.isDown) {
      this.rogue.receive('move', { x: currentPosition.x + 1, y: currentPosition.y })
      moved = true
    } else if (this.cursors.up.isDown) {
      this.rogue.receive('move', { x: currentPosition.x, y: currentPosition.y - 1 })
      moved = true
    } else if (this.cursors.down.isDown) {
      this.rogue.receive('move', { x: currentPosition.x, y: currentPosition.y + 1 })
      moved = true
    }
  
    if (moved) {
      const sprites = this.cache.json.get('ascii')
  
      this.scene.restart()
  
      // Draw floor

      const position = this.rogue.query('position')
      const glyph = this.rogue.query('glyph')
      const color = this.rogue.query('color')
  
      for (let y = 0; y < this.map.terrain.length; y++) {
        for (let x = 0; x < this.map.terrain[y].length; x++) {
          let tint
  
          switch (this.map.terrain[y][x]) {
            case 250:
              tint = 0x2a2a2a
              break
            case 43:
              tint = 0xe67e22
              break
            default:
              tint = 0x666666
              break
          }
          
          if (x !== position.x || y !== position.y)
            this.add.image(x * 32, y * 32, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
        }
      }

      // Draw other entities

      this.entities.forEach(e => {
        let p = e.query('position')
        let g = e.query('glyph')
        let c = e.query('color')

        this.add.image(p.x * 32, p.y * 32, 'ascii', g).setOrigin(0, 0).setTint(c)
      })
  
      // Draw rogue
  
      const x1 = position.x * 32
      const y1 = position.y * 32
      this.add.image(x1, y1, 'ascii', glyph).setOrigin(0, 0).setTint(color)
    }
  }
}