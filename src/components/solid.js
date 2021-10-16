/******************************************************************************
 * An entity with the Solid component blocks movement and projectiles.
 *****************************************************************************/

class SolidComponent extends Component {

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
    if (query.type === 'solid')
      query.result = true
  }

}