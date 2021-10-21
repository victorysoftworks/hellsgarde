/******************************************************************************
 * An entity with the Ephemeral component is removed from the game world
 * after a given number of turns.
 *****************************************************************************/

class EphemeralComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} duration Number of turns the entity should persist
   ***************************************************************************/
  
  constructor(duration) {
    super(Priority.Low)

    this.duration = duration
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'endOfTurn')
      this.fade()
  }

  /****************************************************************************
   * Handles an entity fading away.
   ***************************************************************************/

  fade() {
    this.duration--

    if (this.duration === 0) {
      Game.entityManager.removeEntity(this.owner)
    }
  }

}