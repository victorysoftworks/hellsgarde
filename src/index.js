/******************************************************************************
 * Initialize Phaser
 *****************************************************************************/

const config = {
  type: Phaser.AUTO,
  width: 800, // 25 tiles wide
  height: 576, // 18 tiles tall
  backgroundColor: '#201f1b',
  scene: {
    preload: preload,
    create: create
  }
}

function preload() {
  
}

function create() {
  
}

const game = new Phaser.Game(config)