/******************************************************************************
 * Initialize Phaser
 *****************************************************************************/

const rogue = {
  x: 3,
  y: 3
}

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 218, 196, 196, 196, 196, 196, 196, 191, 0],
  [0, 179, 250, 250, 250, 250, 250, 250, 179, 0],
  [0, 179, 250, 250, 250, 250, 250, 250, 179, 0],
  [0, 179, 250, 250, 250, 250, 250, 250, 179, 0],
  [0, 179, 250, 250, 250, 250, 250, 250, 179, 0],
  [0, 179, 250, 250, 250, 250, 250, 250, 179, 0],
  [0, 192, 196, 196, 196, 196, 43, 196, 217, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

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

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 10; x++) {
      let tint

      switch (map[y][x]) {
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
      
      this.add.image(x * 32, y * 32, 'ascii', map[y][x]).setOrigin(0, 0).setTint(tint)
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

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 10; x++) {
        let tint

        switch (map[y][x]) {
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
        
        this.add.image(x * 32, y * 32, 'ascii', map[y][x]).setOrigin(0, 0).setTint(tint)
      }
    }

    // Draw rogue

    const x1 = rogue.x * 32
    const y1 = rogue.y * 32
    this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
  }
}

const game = new Phaser.Game(config)