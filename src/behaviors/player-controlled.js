/******************************************************************************
 * An entity with the PlayerControlled behavior responds to player keyboard
 * commands (i.e. the Rogue).
 *****************************************************************************/

class PlayerControlledBehavior extends Behavior {

  /****************************************************************************
   * Resolves the entity's action.
   * 
   * @param {Array} input Pressed input keys
   * @returns {boolean|null} Action result
   ***************************************************************************/
  
  act(input) {
    
    // Move NW
    
    if (this.inputContains(input, ['SEVEN'])) {
      return this.move(-1, -1)
    }

    // Move N
    
    else if (this.inputContains(input, ['CURSOR_UP', 'EIGHT'])) {
      return this.move(0, -1)
    }

    // Move NE
    
    else if (this.inputContains(input, ['NINE'])) {
      return this.move(1, -1)
    }

    // Move W
    
    else if (this.inputContains(input, ['CURSOR_LEFT', 'FOUR'])) {
      return this.move(-1, 0)
    }

    // Move E
    
    else if (this.inputContains(input, ['CURSOR_RIGHT', 'SIX'])) {
      return this.move(1, 0)
    }

    // Move SW
    
    else if (this.inputContains(input, ['ONE'])) {
      return this.move(-1, 1)
    }

    // Move S
    
    else if (this.inputContains(input, ['CURSOR_DOWN', 'TWO'])) {
      return this.move(0, 1)
    }

    // Move SE
    
    else if (this.inputContains(input, ['THREE'])) {
      return this.move(1, 1)
    }

    // No action

    else {
      return false
    }
  
  }

  /****************************************************************************
   * Returns true if the given input contains the given pressed keys.
   * 
   * @param {Array} input Pressed input keys
   * @param {Array} keys Keys to search
   * @returns {boolean}
   ***************************************************************************/

  inputContains(input, keys) {
    return input.filter(value => keys.includes(value)).length
  }

  /****************************************************************************
   * Moves the entity.
   * 
   * @param {number} xDelta Change in X position
   * @param {number} yDelta Change in Y position
   * @returns {boolean|null} Action result
   ***************************************************************************/

  move(xDelta, yDelta) {
    const currentPosition = this.owner.query('position')
    const newPosition = {
      x: currentPosition.x + xDelta,
      y: currentPosition.y + yDelta
    }

    // If square is open, move the entity into that square

    if (Game.squareIsOpen(newPosition.x, newPosition.y)) {
      this.owner.receive('move', { x: newPosition.x, y: newPosition.y })

      return true
    
    // Otherwise, don't move the entity and emit a collision event
    
    } else {
      Game.entityManager
          .getEntitiesAtPosition(newPosition.x, newPosition.y)
          .forEach(e => e.receive('collidedWith', { collider: this.owner }))
      
      return false
    }
  }

}