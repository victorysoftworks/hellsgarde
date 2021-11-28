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
    this.numpadOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE)
    this.numpadTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO)
    this.numpadThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE)
    this.numpadFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR)
    this.numpadFive = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE)
    this.numpadSix = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX)
    this.numpadSeven = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN)
    this.numpadEight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT)
    this.numpadNine = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE)
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
    this.broadcastStartOfTurnEvent()
    
    const acted = this.processRogue()
  
    if (acted) {
      this.processNonRogueActors()
      this.tick()
      this.broadcastEndOfTurnEvent()
      this.clearMessageBox()
      this.scene.restart()
      this.render()
    }
  }

  broadcastStartOfTurnEvent() {
    Game.entityManager.getAllEntities().forEach(e => e.receive('startOfTurn'))
  }

  processRogue() {
    const rogue = Game.entityManager.getRogue()
    const behaviors = rogue.query('behaviors')
    const input = this.generatePressedKeysArray()

    let acted = false

    behaviors.forEach(behavior => {
      const result = behavior.act(input)

      if (result) acted = true
    })

    return acted
  }

  processNonRogueActors() {
    const nonRogueActors = Game.entityManager
                               .getAllEntities()
                               .filter(e => e.query('actor'))
                               .filter(e => ! e.query('rogue'))
    
    nonRogueActors.forEach(a => {
      const enemyBehaviors = a.query('behaviors')

      enemyBehaviors.forEach(b => b.act())
    })
  }

  tick() {
    Game.turn++
  }

  broadcastEndOfTurnEvent() {
    Game.entityManager.getAllEntities().forEach(e => e.receive('endOfTurn'))
  }

  clearMessageBox() {
    const messageBox = document.querySelector('[data-message]')
    messageBox.textContent = ''
  }

  generatePressedKeysArray() {
    const keys = []

    if (this.one.isDown || this.numpadOne.isDown)
      keys.push('ONE')
    
    if (this.two.isDown || this.numpadTwo.isDown)
      keys.push('TWO')
    
    if (this.three.isDown || this.numpadThree.isDown)
      keys.push('THREE')
    
    if (this.four.isDown || this.numpadFour.isDown)
      keys.push('FOUR')
    
    if (this.five.isDown || this.numpadFive.isDown)
      keys.push('FIVE')
    
    if (this.six.isDown || this.numpadSix.isDown)
      keys.push('SIX')
    
    if (this.seven.isDown || this.numpadSeven.isDown)
      keys.push('SEVEN')
    
    if (this.eight.isDown || this.numpadEight.isDown)
      keys.push('EIGHT')
    
    if (this.nine.isDown || this.numpadNine.isDown)
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