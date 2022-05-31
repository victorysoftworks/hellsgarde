/******************************************************************************
 * An entity with the Emotion component has an emotional state. Certain
 * behaviors function only/differently when its owning entity is in a given
 * emotional state. An entity can have more than one emotional state, i.e.
 * both "angry" and "sad".
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
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.type === 'emotion')
      query.result.push(this.emotion)
  }

}