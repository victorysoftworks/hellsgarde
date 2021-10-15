/******************************************************************************
 * The EntityManager class tracks all entities in the game world. It also
 * provides convenience methods for fetching entities.
 *****************************************************************************/

class EntityManager {

  /****************************************************************************
   * Constructor.
   ***************************************************************************/
  
  constructor() {
    this.entities = []
  }

  /****************************************************************************
   * Adds the given entity to the game world.
   * 
   * @abstract
   * @param {Entity} entity Entity to add
   ***************************************************************************/

  addEntity(entity) {
    this.entities.push(entity)
  }

  /****************************************************************************
   * Removes the given entity from the game world.
   * 
   * @abstract
   * @param {Entity} entity Entity to remove
   ***************************************************************************/

  removeEntity(entity) {
    this.entities = this.entities.filter(e => ! Object.is(e, entity))
  }

  /****************************************************************************
   * Gets all entities in the game world.
   * 
   * @return {Array}
   ***************************************************************************/

  getAllEntities() {
    return this.entities
  }

  /****************************************************************************
   * Gets all non-static entities in the game world.
   * 
   * @return {Array}
   ***************************************************************************/

  getAllNonStaticEntities() {
    return this.entities.filter(e => ! e.isStatic)
  }

  /****************************************************************************
   * Gets all entities in the game world that have the given tag.
   * 
   * @param {string} tag Tag to filter entities by
   * @return {Array}
   ***************************************************************************/

  getEntitiesByTag(tag) {
    return this.entities.filter(e => ! e.query('tag', false, { tag }))
  }

  /****************************************************************************
   * Gets all entities in the game world that have the given X, Y position.
   * 
   * @param {number} x X position
   * @param {number} y Y position
   * @return {Array}
   ***************************************************************************/

  getEntitiesAtPosition(x, y) {
    return this.entities.filter(e => {
      const position = e.query('position')

      return position && position.x === x && position.y === y
    })
  }

  /****************************************************************************
   * Gets the Rogue.
   * 
   * @return {Entity}
   ***************************************************************************/

  getRogue() {
    return this.entities.filter(e => e.query('isRogue'))[0]
  }

}