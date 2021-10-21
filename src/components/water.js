/******************************************************************************
 * An entity with the Water component is a volume of water. Other effects,
 * such as fire, interact with water entities.
 *****************************************************************************/

class WaterComponent extends Component {

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
    if (query.type === 'water')
      query.result = true
  }

}