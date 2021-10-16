/******************************************************************************
 * An entity with the CollisionTrigger component executes an effect when
 * another entity collides with it. The effect's source is this entity and
 * the target is the colliding entity.
 *****************************************************************************/

class CollisionTriggerComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {Effect} effect Effect to execute
   * @param {function} criteria Criteria entity must meet to trigger effect 
   ***************************************************************************/
  
  constructor(effect, criteria) {
    super(Priority.Low)

    this.effect = effect
    this.criteria = criteria
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'collidedWith' && this.criteria(event.params.collider))
      this.effect.execute(this.owner, event.params.collider)
  }

}