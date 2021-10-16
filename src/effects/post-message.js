/******************************************************************************
 * The PostMessage effect posts a message to the output queue.
 *****************************************************************************/

 class PostMessageEffect extends Effect {

  /****************************************************************************
   * Constructor.
   * 
   * @param {string} message Message to post
   ***************************************************************************/
  
  constructor(message) {
    super()
    
    this.message = message
  }

  /****************************************************************************
   * Executes the effect.
   * 
   * @param {Entity} source Source entity
   * @param {Entity} target Target entity
   ***************************************************************************/

  execute(source, target) {

    // TODO: Move message output logic into the Game object

    const messageBox = document.querySelector('[data-message]')
    messageBox.textContent = this.message
  }

}