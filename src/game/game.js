class Game {

  static start() {
    Game.map = new Map()
    Game.entityManager = new EntityManager()
  }

  static squareIsOpen(x, y) {
    const blocked = Game.map.collision[y][x]
    const entities = Game.entityManager.getEntitiesAtPosition(x, y)

    return entities.length === 0 && ! blocked
  }

}