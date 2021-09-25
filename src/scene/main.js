class MainScene extends Phaser.Scene {
  constructor(frameWidth, frameHeight, rogue, map) {
    super()

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.rogue = rogue
    this.map = map
    this.cursors = null
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
  
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 10; x++) {
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
        
        if (x !== this.rogue.x || y !== this.rogue.y)
          this.add.image(x * 32, y * 32, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
      }
    }
  
    // Draw rogue
  
    const x1 = this.rogue.x * 32
    const y1 = this.rogue.y * 32
    this.add.image(x1, y1, 'ascii', sprites['HELM']).setOrigin(0, 0).setTint(0xbe90d4)
  }

  update() {
    let moved = false
  
    if (this.cursors.left.isDown) {
      this.rogue.x--
      moved = true
    } else if (this.cursors.right.isDown) {
      this.rogue.x++
      moved = true
    } else if (this.cursors.up.isDown) {
      this.rogue.y--
      moved = true
    } else if (this.cursors.down.isDown) {
      this.rogue.y++
      moved = true
    }
  
    if (moved) {
      const sprites = this.cache.json.get('ascii')
  
      this.scene.restart()
  
      // Draw floor
  
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 10; x++) {
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
          
          if (x !== this.rogue.x || y !== this.rogue.y)
            this.add.image(x * 32, y * 32, 'ascii', this.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
        }
      }
  
      // Draw rogue
  
      const x1 = this.rogue.x * 32
      const y1 = this.rogue.y * 32
      this.add.image(x1, y1, 'ascii', sprites['HELM']).setOrigin(0, 0).setTint(0xbe90d4)
    }
  }
}