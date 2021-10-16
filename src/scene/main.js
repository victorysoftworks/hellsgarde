class MainScene extends Phaser.Scene {
  constructor(frameWidth, frameHeight, map) {
    super()

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
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
  
    // Draw floor
    const rogue = Game.entityManager.getRogue()
    const position = rogue.query('position')
    const glyph = rogue.query('glyph')
    const color = rogue.query('color')
  
    for (let y = 0; y < this.map.terrain.length; y++) {
      for (let x = 0; x < this.map.terrain[y].length; x++) {
        let tint
  
        switch (this.map.terrain[y][x]) {
          case 250:
            tint = 0x3a3a3a
            break
          case 43:
            tint = 0xa66b3a
            break
          default:
            tint = 0x666666
            break
        }
        
        if (x !== position.x || y !== position.y)
          this.add.image(x * 24, y * 24, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
      }
    }

    // Draw other entities

    Game.entityManager.getAllEntities().forEach(e => {
      let p = e.query('position')
      let g = e.query('glyph')
      let c = e.query('color')

      this.add.image(p.x * 24, p.y * 24, 'ascii', g).setOrigin(0, 0).setTint(c)
    })
  
    // Draw rogue
    
    const x1 = position.x * 24
    const y1 = position.y * 24
    this.add.image(x1, y1, 'ascii', glyph).setOrigin(0, 0).setTint(color)
  }

  update() {
    const rogue = Game.entityManager.getRogue()
    let currentPosition = rogue.query('position')
    let moved = false
  
    if (this.cursors.left.isDown) {
      rogue.receive('move', { x: currentPosition.x - 1, y: currentPosition.y })
      moved = true
    } else if (this.cursors.right.isDown) {
      rogue.receive('move', { x: currentPosition.x + 1, y: currentPosition.y })
      moved = true
    } else if (this.cursors.up.isDown) {
      rogue.receive('move', { x: currentPosition.x, y: currentPosition.y - 1 })
      moved = true
    } else if (this.cursors.down.isDown) {
      rogue.receive('move', { x: currentPosition.x, y: currentPosition.y + 1 })
      moved = true
    }
  
    if (moved) {
      const sprites = this.cache.json.get('ascii')
  
      this.scene.restart()
  
      // Draw floor

      const position = rogue.query('position')
      const glyph = rogue.query('glyph')
      const color = rogue.query('color')
  
      for (let y = 0; y < this.map.terrain.length; y++) {
        for (let x = 0; x < this.map.terrain[y].length; x++) {
          let tint
  
          switch (this.map.terrain[y][x]) {
            case 250:
              tint = 0x3a3a3a
              break
            case 43:
              tint = 0xa66b3a
              break
            default:
              tint = 0x666666
              break
          }
          
          if (x !== position.x || y !== position.y)
            this.add.image(x * 24, y * 24, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
        }
      }

      // Draw other entities

      Game.entityManager.getAllEntities().forEach(e => {
        let p = e.query('position')
        let g = e.query('glyph')
        let c = e.query('color')

        this.add.image(p.x * 24, p.y * 24, 'ascii', g).setOrigin(0, 0).setTint(c)
      })
  
      // Draw rogue
  
      const x1 = position.x * 24
      const y1 = position.y * 24
      this.add.image(x1, y1, 'ascii', glyph).setOrigin(0, 0).setTint(color)
    }
  }
}