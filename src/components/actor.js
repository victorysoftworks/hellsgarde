/******************************************************************************
 * An entity with the Actor component has behaviors and can act each turn.
 *****************************************************************************/

class ActorComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {Array} behaviors Behaviors
   ***************************************************************************/
  
  constructor(behaviors) {
    super(Priority.Default)

    this.behaviors = behaviors
  }

  /****************************************************************************
   * Sets the component's owning entity.
   * 
   * @param {Entity} entity Owning entity
   ***************************************************************************/

  setOwner(entity) {
    this.owner = entity
    this.behaviors.forEach(b => b.owner = entity)
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    this.behaviors.forEach(b => b.receive(event))
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'actor')
      query.result = true
    
    if (query.type === 'behaviors')
      query.result = this.behaviors
    
    this.behaviors.forEach(b => b.query(query))
  }

}