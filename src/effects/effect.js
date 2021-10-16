/******************************************************************************
 * The base class from which all effect classes are dervied.
 *****************************************************************************/

class Effect {

  /****************************************************************************
   * Executes the effect.
   * 
   * @abstract
   * @param {Entity} source Source entity
   * @param {Entity} target Target entity
   ***************************************************************************/

  execute(source, target) { }

}