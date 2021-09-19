/******************************************************************************
 * Initialize Phaser
 *****************************************************************************/

const rogue = {
  x: 12,
  y: 9
}

let cursors

const config = {
  type: Phaser.AUTO,
  width: 800, // 25 tiles wide
  height: 608, // 19 tiles tall
  backgroundColor: '#201f1b',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

function preload() {
  this.load.json('ascii', './data/ascii.json')
  this.load.spritesheet('ascii', 
    './data/ascii.png',
    {
      frameWidth: 32,
      frameHeight: 32
    }
  )
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  const sprites = this.cache.json.get('ascii')

  // Draw floor

  for (let y = 0; y < 19; y++) {
    for (let x = 0; x < 25; x++) {
      this.add.image(x * 32, y * 32, 'ascii', sprites['SMALL_DOT']).setOrigin(0, 0).setTint(0x2a2a2a)
    }
  }

  // Draw rogue

  const x1 = rogue.x * 32
  const y1 = rogue.y * 32
  this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
}

function update() {
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

    for (let y = 0; y < 19; y++) {
      for (let x = 0; x < 25; x++) {
        this.add.image(x * 32, y * 32, 'ascii', sprites['SMALL_DOT']).setOrigin(0, 0).setTint(0x2a2a2a)
      }
    }

    // Draw rogue

    const x1 = rogue.x * 32
    const y1 = rogue.y * 32
    this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
  }
}

const game = new Phaser.Game(config)