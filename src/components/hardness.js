/******************************************************************************
 * An entity with the Hardness component has physical resilience (like stone)
 * or surface tension (like water). Hardness has no effect on its own but is
 * used by other game events to calculate values like falling damage.
 *****************************************************************************/

class HardnessComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} hardness Hardness value between 0 (soft) and 100 (hard)
   ***************************************************************************/
  
  constructor(hardness) {
    super(Priority.Default)

    this.hardness = hardness
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'hardness')
      query.result += this.hardness
  }

}