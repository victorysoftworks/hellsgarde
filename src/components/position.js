/******************************************************************************
 * An entity with the Position component has an X,Y position on the map.
 *****************************************************************************/

class PositionComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} x X position
   * @param {number} y Y position
   ***************************************************************************/
  
  constructor(x, y) {
    super(Priority.Default)

    this.x = x
    this.y = y
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'move')
      this.move(event.params.x, event.params.y)
  }

  /****************************************************************************
   * Sets the entity's X,Y position.
   * 
   * @param {number} x X position
   * @param {number} y Y position
   ***************************************************************************/

  move(x, y) {
    this.x = x
    this.y = y
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'position')
      query.result = { x: this.x, y: this.y }
  }

}