/******************************************************************************
 * An entity with the Light component sheds light.
 *****************************************************************************/

class LightComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {string} radius Light radius in squares
   * @param {string} tint Tint color (0x123456)
   ***************************************************************************/
  
  constructor(radius, tint) {
    super(Priority.High)

    this.radius = radius
    this.tint = tint
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'extinguish')
      this.owner.removeComponent(this)
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'lit')
      query.result = true
    
    if (query.type === 'lightRadius')
      query.result += this.radius
    
    if (query.type === 'color') {
      query.result = this.tint
      query.stopped = true
    }
  }

}