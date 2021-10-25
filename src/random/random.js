/******************************************************************************
 * The Random class provides static methods for random number generation and
 * random selection of elements from arrays.
 * 
 * TODO: Add seeds as parameters.
 *****************************************************************************/

class Random {

  /****************************************************************************
   * Generates a random integer between min and max, inclusive.
   * 
   * @param {number} min Minimum number in range
   * @param {number} max Maximum number in range
   * @returns {number} Random integer
   ***************************************************************************/

  static number(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /****************************************************************************
   * Gets a random element from the given array.
   * 
   * @param {Array} array Array to get random element from
   * @returns {any} Random element
   ***************************************************************************/

  static choice(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

}