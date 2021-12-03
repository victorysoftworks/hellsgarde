class Geometry {

  static distanceBetween(x1, y1, x2, y2) {
    const xDelta = x1 - x2;
    const yDelta = y1 - y2;

    return Math.floor(Math.hypot(xDelta, yDelta))
  }

}