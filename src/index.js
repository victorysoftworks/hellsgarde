/******************************************************************************
 * Initialize Phaser
 *****************************************************************************/

const config = {
  type: Phaser.AUTO,
  width: 800, // 25 tiles wide
  height: 608, // 19 tiles tall
  backgroundColor: '#201f1b',
  scene: {
    preload: preload,
    create: create
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
  const sprites = this.cache.json.get('ascii')

  // Draw floor

  for (let y = 0; y < 19; y++) {
    for (let x = 0; x < 25; x++) {
      this.add.image(x * 32, y * 32, 'ascii', sprites['SMALL_DOT']).setOrigin(0, 0).setTint(0x2e2e2e)
    }
  }

  // Draw rogue

  const x1 = 12 * 32
  const y1 = 9 * 32
  this.add.image(x1, y1, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
}

const game = new Phaser.Game(config)