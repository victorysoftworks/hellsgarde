/******************************************************************************
 * An entity with the Emotion component has an emotional state. Certain
 * behaviors function only/differently when its owning entity is in a given
 * emotional state.
 *****************************************************************************/

class EmotionComponent extends Component {

  /****************************************************************************
   * Constructor.
   ***************************************************************************/
  
  constructor(emotion) {
    super(Priority.Default)

    this.emotion = emotion
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'setEmotion')
      this.emotion = event.params.emotion
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'emotion')
      query.result = this.emotion
  }

}