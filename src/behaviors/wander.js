/******************************************************************************
 * An entity with the Wander behavior moves into a random adjacent open
 * square.
 *****************************************************************************/

class WanderBehavior extends Behavior {

  /****************************************************************************
   * Resolves the entity's action.
   * 
   * @returns {boolean|null} Action result
   ***************************************************************************/

  act() {
    const adjacentOpenSquares = this.getAdjacentOpenSquares()

    if (adjacentOpenSquares.length) {
      const targetSquare = Random.choice(adjacentOpenSquares)
      
      this.owner.receive('move', { x: targetSquare.x, y: targetSquare.y })

      return true
    } else {
      return false
    }
  }

  /****************************************************************************
   * Returns all open squares adjacent to entity.
   * 
   * @returns {Array} Open squares
   ***************************************************************************/

  getAdjacentOpenSquares() {
    const position = this.owner.query('position')
    const offsets = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ]
    const squares = offsets.map(o => { 
      return { x: position.x + o[0], y: position.y + o[1] }
    })

    return squares.filter(s => Game.squareIsOpen(s.x, s.y))
  }

}