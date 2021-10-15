/******************************************************************************
 * The entity with the Rogue component is our heroine.
 *****************************************************************************/

class RogueComponent extends Component {

  /****************************************************************************
   * Constructor.
   ***************************************************************************/
  
  constructor() {
    super(Priority.First)
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'tag' && query.params.tag === 'rogue')
      query.result = true
  }

}