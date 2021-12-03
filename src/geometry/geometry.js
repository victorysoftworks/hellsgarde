class Geometry {

  static distanceBetween(x1, y1, x2, y2) {
    const xDelta = x1 - x2;
    const yDelta = y1 - y2;

    return Math.floor(Math.hypot(xDelta, yDelta))
  }

  // Bresenham's line algorithm

  static squaresBetween(x0, y0, x1, y1) {
    var squares = []
    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
    var err = (dx>dy ? dx : -dy)/2;
  
    while (true) {
      squares.push([x0, y0])
      
      if (x0 === x1 && y0 === y1) break;
      var e2 = err;
      if (e2 > -dx) { err -= dy; x0 += sx; }
      if (e2 < dy) { err += dx; y0 += sy; }
    }

    return squares
  }

}