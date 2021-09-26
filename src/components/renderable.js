/******************************************************************************
 * An entity with the Renderable component can be drawn to the screen.
 *****************************************************************************/

class RenderableComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} glyph ASCII glyph code
   * @param {number} color Hex color (0x123456)
   ***************************************************************************/
  
  constructor(glyph, color) {
    this.glyph = glyph
    this.color = color
  }

  /****************************************************************************
   * Handles events broadcast to the component.
   * 
   * @param {Event} event Event to handle
   ***************************************************************************/

  receive(event) {
    if (event.type === 'setGlyph')
      this.setGlyph(event.params.glyph)
    
    if (event.type === 'setColor')
      this.setColor(event.params.color)
  }

  /****************************************************************************
   * Sets the entity's ASCII glyph.
   * 
   * @param {number} glyph ASCII glyph code
   ***************************************************************************/

  setGlyph(glyph) {
    this.glyph = glyph
  }

  /****************************************************************************
   * Sets the entity's color.
   * 
   * @param {number} color Hex color (0x123456)
   ***************************************************************************/

  setColor(color) {
    this.color = color
  }

  /****************************************************************************
   * Handles queries made to the component.
   * 
   * @param {Query} query Query to handle
   ***************************************************************************/

  query(query) {
    if (query.for === 'glyph')
      query.result = this.glyph
    
    if (query.for === 'color')
      query.result = this.color
  }

}