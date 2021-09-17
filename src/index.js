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
  const x = 12 * 32;
  const y = 9 * 32;
  this.add.image(x, y, 'ascii', sprites['ROGUE']).setOrigin(0, 0).setTint(0xbe90d4)
}

const game = new Phaser.Game(config)