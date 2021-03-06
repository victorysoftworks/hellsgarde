/******************************************************************************
 * An entity with the Renderable component can be drawn to the screen.
 *****************************************************************************/

class RenderableComponent extends Component {

  /****************************************************************************
   * Constructor.
   * 
   * @param {number} glyph ASCII glyph code
   * @param {number} color Hex color (0x123456)
   * @param {number} layer Render layer
   ***************************************************************************/
  
  constructor(glyph, color, layer) {
    super(Priority.Default)

    this.glyph = glyph
    this.color = color
    this.layer = layer
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
    if (query.type === 'glyph')
      query.result = this.glyph
    
    if (query.type === 'color')
      query.result = this.color
    
    if (query.type === 'layer')
      query.result = this.layer
  }

}