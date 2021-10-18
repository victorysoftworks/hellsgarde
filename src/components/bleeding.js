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
      this.leaveBloodDrop(event.params.from.x, event.params.from.y)
  }

  /****************************************************************************
   * Leaves a temporary blood drop in the space the bleeding entity just
   * moved from.
   * 
   * @param {number} glyph ASCII glyph code
   ***************************************************************************/

  leaveBloodDrop(x, y) {
    const blood = new Entity()
    blood.addComponent(new RenderableComponent(250, 0x96281b, Layer.Decal))
    blood.addComponent(new PositionComponent(x, y))

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