class MainScene extends Phaser.Scene {
  constructor(frameWidth, frameHeight, cameraWidth, cameraHeight) {
    super()

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.cameraWidth = cameraWidth
    this.cameraHeight = cameraHeight
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
    const minX = position.x - ((this.cameraWidth - 1) / 2)
    const maxX = position.x + ((this.cameraWidth - 1) / 2)
    const minY = position.y - ((this.cameraHeight - 1) / 2)
    const maxY = position.y + ((this.cameraHeight - 1) / 2)
    const glyph = rogue.query('glyph')
    const color = rogue.query('color')
    
    let screenX = 0
    let screenY = 0

    for (let y = minY; y <= maxY; y++) {
      if (y >= 0 && y < Game.map.terrain.length) {
        for (let x = minX; x <= maxX; x++) {
          if (x >= 0 && x < Game.map.terrain[0].length) {
            let tint
    
            switch (Game.map.terrain[y][x]) {
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
            
            if (x !== position.x || y !== position.y) {
              this.add.image(screenX * this.frameWidth, screenY * this.frameHeight, 'ascii', Game.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
            }

            Game.entityManager.getEntitiesAtPosition(x, y).forEach(e => {
              let g = e.query('glyph')
              let c = e.query('color')
      
              this.add.image(screenX * this.frameWidth, screenY * this.frameHeight, 'ascii', g).setOrigin(0, 0).setTint(c)
            })
          }

          screenX++
        }
      }

      screenX = 0
      screenY++
    }
  }

  update() {
    const rogue = Game.entityManager.getRogue()
    let currentPosition = rogue.query('position')
    let moved = false
    let collision = false
    let collisionX, collisionY
    
    // Left

    if (this.cursors.left.isDown) {
      if (Game.squareIsOpen(currentPosition.x - 1, currentPosition.y)) {
        rogue.receive('move', { x: currentPosition.x - 1, y: currentPosition.y })
        moved = true
      } else {
        collision = true
        collisionX = currentPosition.x - 1
        collisionY = currentPosition.y
      }
    
    // Right
    
    } else if (this.cursors.right.isDown) {
      if (Game.squareIsOpen(currentPosition.x + 1, currentPosition.y)) {
        rogue.receive('move', { x: currentPosition.x + 1, y: currentPosition.y })
        moved = true
      } else {
        collision = true
        collisionX = currentPosition.x + 1
        collisionY = currentPosition.y
      }
    
    // Up
    
    } else if (this.cursors.up.isDown) {
      if (Game.squareIsOpen(currentPosition.x, currentPosition.y - 1)) {
        rogue.receive('move', { x: currentPosition.x, y: currentPosition.y - 1 })
        moved = true
      } else {
        collision = true
        collisionX = currentPosition.x
        collisionY = currentPosition.y - 1
      }
    
    // Down
    
    } else if (this.cursors.down.isDown) {
      if (Game.squareIsOpen(currentPosition.x, currentPosition.y + 1)) {
        rogue.receive('move', { x: currentPosition.x, y: currentPosition.y + 1 })
        moved = true
      } else {
        collision = true
        collisionX = currentPosition.x
        collisionY = currentPosition.y + 1
      }
    }
  
    if (moved) {
      const messageBox = document.querySelector('[data-message]')
      messageBox.textContent = ''
      
      const sprites = this.cache.json.get('ascii')
  
      this.scene.restart()
  
      // Draw floor

      const position = rogue.query('position')
      const minX = position.x - ((this.cameraWidth - 1) / 2)
      const maxX = position.x + ((this.cameraWidth - 1) / 2)
      const minY = position.y - ((this.cameraHeight - 1) / 2)
      const maxY = position.y + ((this.cameraHeight - 1) / 2)
      const glyph = rogue.query('glyph')
      const color = rogue.query('color')
  
      let screenX = 0
      let screenY = 0

      for (let y = minY; y <= maxY; y++) {
        if (y >= 0 && y < Game.map.terrain.length) {
          for (let x = minX; x <= maxX; x++) {
            if (x >= 0 && x < Game.map.terrain[0].length) {
              let tint
      
              switch (Game.map.terrain[y][x]) {
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
              
              if (x !== position.x || y !== position.y) {
                this.add.image(screenX * this.frameWidth, screenY * this.frameHeight, 'ascii', Game.map.terrain[y][x]).setOrigin(0, 0).setTint(tint)
              }

              Game.entityManager.getEntitiesAtPosition(x, y).forEach(e => {
                let g = e.query('glyph')
                let c = e.query('color')
        
                this.add.image(screenX * this.frameWidth, screenY * this.frameHeight, 'ascii', g).setOrigin(0, 0).setTint(c)
              })
            }

            screenX++
          }
        }

        screenX = 0
        screenY++
      }
    } else if (collision) {
      Game.entityManager
          .getEntitiesAtPosition(collisionX, collisionY)
          .forEach(e => e.receive('collidedWith', { collider: rogue }))
    }
  }
}