/******************************************************************************
 * An entity with the Opaque component blocks light and line of sight.
 *****************************************************************************/

class OpaqueComponent extends Component {

  /****************************************************************************
   * Constructor.
   ***************************************************************************/
  
  constructor() {
    super(Priority.Default)
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'opaque')
      query.result = true
  }

}