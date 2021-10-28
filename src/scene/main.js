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
    this.cursors = this.input.keyboard.createCursorKeys()
    this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
    this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    this.three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
    this.four = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
    this.five = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
    this.six = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
    this.seven = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
    this.eight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT)
    this.nine = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)
    this.render()
  }

  update() {
    this.processTurn()
  }

  render() {
    const rogue = Game.entityManager.getRogue()
    const position = rogue.query('position')
    const minX = position.x - ((this.cameraWidth - 1) / 2)
    const maxX = position.x + ((this.cameraWidth - 1) / 2)
    const minY = position.y - ((this.cameraHeight - 1) / 2)
    const maxY = position.y + ((this.cameraHeight - 1) / 2)
    
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

            const entityToRender = Game.entityManager.getRenderableEntityAtPosition(x, y)

            if (entityToRender) {
              let g = entityToRender.query('glyph')
              let c = entityToRender.query('color')
      
              this.add.image(screenX * this.frameWidth, screenY * this.frameHeight, 'ascii', g).setOrigin(0, 0).setTint(c)
            }
          }

          screenX++
        }
      }

      screenX = 0
      screenY++
    }
  }

  processTurn() {
    Game.entityManager.getAllEntities().forEach(e => e.receive('startOfTurn'))

    const rogue = Game.entityManager.getRogue()
    const behaviors = rogue.query('behaviors')
    const input = this.generatePressedKeysArray()
    
    let acted = false

    behaviors.forEach(behavior => {
      const result = behavior.act(input)

      if (result) acted = true
    })
  
    if (acted) {

      // Process non-Rogue actors

      const nonRogueActors = Game.entityManager
                                 .getAllEntities()
                                 .filter(e => e.query('actor'))
                                 .filter(e => ! e.query('rogue'))
      
      nonRogueActors.forEach(a => {
        const enemyBehaviors = a.query('behaviors')

        enemyBehaviors.forEach(b => b.act())
      })

      // End of turn

      Game.turn++
      Game.entityManager.getAllEntities().forEach(e => e.receive('endOfTurn'))
      
      const messageBox = document.querySelector('[data-message]')
      messageBox.textContent = ''
  
      this.scene.restart()
      this.render()
    }
  }

  generatePressedKeysArray() {
    const keys = []

    if (this.one.isDown)
      keys.push('ONE')
    
    if (this.two.isDown)
      keys.push('TWO')
    
    if (this.three.isDown)
      keys.push('THREE')
    
    if (this.four.isDown)
      keys.push('FOUR')
    
    if (this.five.isDown)
      keys.push('FIVE')
    
    if (this.six.isDown)
      keys.push('SIX')
    
    if (this.seven.isDown)
      keys.push('SEVEN')
    
    if (this.eight.isDown)
      keys.push('EIGHT')
    
    if (this.nine.isDown)
      keys.push('NINE')
    
    if (this.cursors.left.isDown)
      keys.push('CURSOR_LEFT')
    
    if (this.cursors.right.isDown)
      keys.push('CURSOR_RIGHT')
    
    if (this.cursors.up.isDown)
      keys.push('CURSOR_UP')
    
    if (this.cursors.down.isDown)
      keys.push('CURSOR_DOWN')

    return keys
  }

}