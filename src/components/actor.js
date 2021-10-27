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
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'startOfTurn')
      this.bindOwners()
    
    this.behaviors.forEach(b => b.receive(event))
  }

  /****************************************************************************
   * Binds owning entities to behaviors that do not have one yet.
   ***************************************************************************/

  bindOwners() {
    this.behaviors.forEach(b => {
      if ( ! b.owner) b.owner = this.owner
    })
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'behaviors')
      query.result = this.behaviors
    
    this.behaviors.forEach(b => b.query(query))
  }

}