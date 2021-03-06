/******************************************************************************
 * The TemporaryComponent class decorates another component. The decorated
 * component is removed from its owning entity after a given number of turns.
 *****************************************************************************/

class TemporaryComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {Component} component Component to make temporary
   * @param {number} duration Number of turns the entity should persist
   ***************************************************************************/
  
  constructor(component, duration) {
    super(Priority.Low)

    this.component = component
    this.duration = duration
  }

  /****************************************************************************
   * Sets the component's owning entity.
   * 
   * @param {Entity} entity Owning entity
   ***************************************************************************/

  setOwner(entity) {
    this.owner = entity
    this.component.owner = entity
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'endOfTurn')
      this.expire()
    
    this.component.receive(event)
  }

  /****************************************************************************
   * Handles the temporary component expiring.
   ***************************************************************************/

  expire() {
    this.duration--

    if (this.duration === 0) {
      this.owner.removeComponent(this)
    }
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    this.component.query(query)
  }

}