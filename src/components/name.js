/******************************************************************************
 * An entity with the Name component has a name.
 *****************************************************************************/

class NameComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {string} name Name
   ***************************************************************************/
  
  constructor(name) {
    super(Priority.Default)

    this.name = name
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'name' || query.type === 'baseName')
      query.result += this.name
  }

}