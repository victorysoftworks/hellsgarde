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
   * @param {Entity} entity Entity to add
   ***************************************************************************/

  addEntity(entity) {
    this.entities.push(entity)
  }

  /****************************************************************************
   * Adds multiple given entities to the game world.
   * 
   * @param {Array} entities Entities to add
   ***************************************************************************/

   addEntities(entities) {
    this.entities.push(...entities)
  }

  /****************************************************************************
   * Removes the given entity from the game world.
   * 
   * @param {Entity} entity Entity to remove
   ***************************************************************************/

  removeEntity(entity) {
    this.entities = this.entities.filter(e => ! Object.is(e, entity))
  }

  /****************************************************************************
   * Removes all entities from the game world.
   ***************************************************************************/

  removeAllEntities() {
    this.entities = []
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
   * Gets all movement- and projectile-blocking entities in the game world
   * that have the given X, Y position.
   * 
   * @param {number} x X position
   * @param {number} y Y position
   * @return {Array}
   ***************************************************************************/

  getSolidEntitiesAtPosition(x, y) {
    return this.getEntitiesAtPosition(x, y).filter(e => e.query('solid'))
  }

  /****************************************************************************
   * Gets the renderable entity at the given position with the
   * highest-priority layer. Returns null if there are no renderable entities
   * at the given location.
   * 
   * @param {number} x X position
   * @param {number} y Y position
   * @returns {Array|null}
   ***************************************************************************/

  getRenderableEntityAtPosition(x, y) {
    const entities = this.getEntitiesAtPosition(x, y)

    return (entities.length)
      ? entities.sort((a, b) => a.query('layer') - b.query('layer'))[0]
      : null
  }

  /****************************************************************************
   * Gets all entities in the game world that have the given tag.
   * 
   * @param {string} tag Tag to filter entities by
   * @return {Array}
   ***************************************************************************/

  getEntitiesByTag(tag) {
    return this.entities.filter(e => e.query('tag', false, { tag }))
  }

  /****************************************************************************
   * Gets the Rogue.
   * 
   * @return {Entity}
   ***************************************************************************/

  getRogue() {
    return this.entities.filter(e => e.query('rogue'))[0]
  }

}