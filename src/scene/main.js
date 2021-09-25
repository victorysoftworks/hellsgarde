class MainScene extends Phaser.Scene {
  preload() {
    this.load.json('ascii', './data/ascii.json')
    this.load.spritesheet('ascii', 
      './data/ascii.png',
      {
        frameWidth: 32,
        frameHeight: 32
      }
    )
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();
  
    const sprites = this.cache.json.get('ascii')
  
    // Draw floor
  
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 10; x++) {
        let tint
  
        switch (map.terrain[y][x]) {
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
        
        this.add.image(x * 32, y * 32, 'ascii', map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
      }
    }
  
    // Draw rogue
  
    const x1 = rogue.x * 32
    const y1 = rogue.y * 32
    this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
  }

  update() {
    let moved = false
  
    if (cursors.left.isDown) {
      rogue.x--
      moved = true
    } else if (cursors.right.isDown) {
      rogue.x++
      moved = true
    } else if (cursors.up.isDown) {
      rogue.y--
      moved = true
    } else if (cursors.down.isDown) {
      rogue.y++
      moved = true
    }
  
    if (moved) {
      const sprites = this.cache.json.get('ascii')
  
      this.scene.restart()
  
      // Draw floor
  
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 10; x++) {
          let tint
  
          switch (map.terrain[y][x]) {
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
          
          this.add.image(x * 32, y * 32, 'ascii', map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
        }
      }
  
      // Draw rogue
  
      const x1 = rogue.x * 32
      const y1 = rogue.y * 32
      this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
    }
  }
}