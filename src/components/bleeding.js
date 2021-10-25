/******************************************************************************
 * An entity with the Bleeding component gains a red tint and leaves temporary
 * blood drops on the ground behind it when it moves.
 *****************************************************************************/

class BleedingComponent extends Component {

  /****************************************************************************
   * Constructor.
   ***************************************************************************/
  
  constructor() {
    super(Priority.Low)
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'moved')
      this.bleed(event.params.from.x, event.params.from.y)
  }

  /****************************************************************************
   * Handles an entity bleeding out.
   * 
   * @param {number} x X position of bleeding entity
   * @param {number} y Y position of bleeding entity
   ***************************************************************************/

  bleed(x, y) {
    
    // Check for water entities in the square. If there are, "stain" the water
    // rather than leaving a blood drop.

    const waterEntities = Game.entityManager
                              .getEntitiesAtPosition(x, y)
                              .filter(e => e.query('water'))
    
    waterEntities.length
      ? this.stainWater(waterEntities[0])
      : this.leaveBloodDrop(x, y)
  }

  /****************************************************************************
   * Stains the given water entity red with blood.
   * 
   * @param {Entity} water Water entity to stain with blood
   ***************************************************************************/

  stainWater(water) {
    water.receive('setColor', { color: 0x96281b })
  }

  /****************************************************************************
   * Leaves a temporary blood drop decal at the given X,Y position.
   * 
   * @param {number} x X position of bleeding entity
   * @param {number} y Y position of bleeding entity
   ***************************************************************************/

  leaveBloodDrop(x, y) {
    const blood = new Entity()
    const duration = Random.number(10, 20)
    blood.addComponent(new RenderableComponent(250, 0x96281b, Layer.Decal))
    blood.addComponent(new PositionComponent(x, y))
    blood.addComponent(new EphemeralComponent(duration))

    Game.entityManager.addEntity(blood)
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'color')
      query.result = 0x96281b
  }

}