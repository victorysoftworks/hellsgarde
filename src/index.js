let cursors

const rogue = new Player()
const map = new Map()
const game = new Game({
  type: Phaser.AUTO,
  width: 800, // 25 tiles wide
  height: 608, // 19 tiles tall
  backgroundColor: '#201f1b',
  scene: new MainScene()
})