/******************************************************************************
 * The base class from which all component classes are dervied.
 *****************************************************************************/

class Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} priority Order in which component should be processed
   ***************************************************************************/
  
  constructor(priority) {
    this.priority = priority
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @abstract
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) { }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @abstract
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) { }

}