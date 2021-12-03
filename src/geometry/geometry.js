class Geometry {

  static distanceBetween(x1, y1, x2, y2) {
    const xDelta = x1 - x2;
    const yDelta = y1 - y2;

    return Math.floor(Math.hypot(xDelta, yDelta))
  }

  // Bresenham's line algorithm

  static squaresBetween(x1, y1, x2, y2) {
    const squares = []
    const deltaX = Math.abs(x2 - x1)
    const deltaY = Math.abs(y2 - y1)
    const slopeX = x1 < x2 ? 1 : -1
    const slopeY = y1 < y2 ? 1 : -1
    
    let error = (deltaX > deltaY ? deltaX : -deltaY) / 2
  
    while (true) {
      squares.push([x1, y1])
      
      if (x1 === x2 && y1 === y2) break

      const e2 = error
      
      if (e2 > -deltaX) {
        error -= deltaY
        x1 += slopeX
      }

      if (e2 < deltaY) {
        error += deltaX
        y1 += slopeY
      }
    }

    return squares
  }

}