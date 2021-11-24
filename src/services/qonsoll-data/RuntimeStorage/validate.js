const validate = {
  /**
   * Validates path
   * @param {string} path - path to the document
   * @param {string} method - method that calls validation
   */
  path: (path, method) => {
    try {
      if (!path) {
        throw new Error(
          `<path> is not provided to the ${method} method of RuntimeStorage`
        )
      }
    } catch (err) {
      console.error(err)
    }
  },
  /**
   * Validates value
   * @param {string|object|array} value - value that should be validated
   * @param {string} method - method that calls validation
   */
  value: (value, method) => {
    try {
      if (!value) {
        throw new Error(
          `<value> is not provided to the ${method} method of RuntimeStorage`
        )
      }
    } catch (err) {
      console.error(err)
    }
  },
  /**
   * Validates initial state
   * @param {object} initialState - initial state object that should be validated
   */
  initialState: (initialState) => {
    try {
      if (!initialState) {
        throw new Error(
          `Initial state is not provided to the RuntimeStorage class`
        )
      }
    } catch (err) {
      console.warn(err)
    }
  }
}

export default validate
