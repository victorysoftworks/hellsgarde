/******************************************************************************
 * The Pathfinding class provides static methods for pathfinding and
 * generating Dijkstra maps.
 *****************************************************************************/

class Pathfinding {

  /****************************************************************************
   * Generates a Dijkstra map from the given collision map and set of goal
   * points.
   * 
   * @param {Array} collisionMap Collision map, 0-open, 1-blocked
   * @param {Array} goals Array of [x, y] goal point tuples
   * @returns {Array}
   ***************************************************************************/

  static dijkstra(collisionMap, goals) {
    const dijkstra = []
    const collisionMapWidth = collisionMap.length
    const collisionMapHeight = collisionMap[0].length

    for (let y = 0; y < collisionMapHeight; y++) {
      const row = []
      
      for (let x = 0; x < collisionMapWidth; x++) {
        row.push(0)
      }

      dijkstra.push(row)
    }

    for (y = 0; y < collisionMapHeight; y++) {
      for (x = 0; x < collisionMapWidth; x++) {
        const goalPointsAtLocation = goals.filter(goal => {
          return x === goal[0] && y === goal[1]
        })

        dijkstra[y][x] = goalPointsAtLocation.length ? 0 : 999
      }
    }

    return dijkstra
  }

}