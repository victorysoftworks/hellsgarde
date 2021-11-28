/******************************************************************************
 * An entity with the Name component has a name.
 *****************************************************************************/

class NameComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {string} name Name
   ***************************************************************************/
  
  constructor(name, article) {
    super(Priority.Default)

    this.name = name
    this.article = article
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'name' || query.type === 'baseName')
      query.result += this.name
    
    if (query.type === 'article')
      query.result = this.article
  }

}