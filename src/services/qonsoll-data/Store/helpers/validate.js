import traverse from 'traverse'

/**
 * Return object with invalid key
 * @param {string} key - key of object which has invalid data
 */
const invalid = (key) => {
  return { validated: false, invalidField: key }
}

/**
 * Method for validating array
 * @param {object} valid - the instance of valid object
 * @param {string} key - key value of which is an array
 * @param {array} value - array which been validated
 */
const validateArray = (valid, key, value) => {
  // Pick every item in validated array
  value.forEach((arrayItem) => {
    //If validated item is object we need to recursively check the value
    if (typeof arrayItem === 'object') {
      traverse(arrayItem).forEach(function () {
        // If some key has undefined or null value return his key
        if (this.node === undefined) valid = invalid(this.key)
      })
    }
    // If validated item is simple value and his value is false return his key
    if (arrayItem === undefined) {
      valid = invalid(key)
      return valid
    }
  })
  return valid
}

/**
 * Validates values
 * @param {string} method - method that calls validation
 * @param {object} values - values that should be validated
 */
const validate = (method, values) => {
  // Go through each key of the object and check his value
  const isValid = Object.entries(values).reduce(
    (valid, parameter) => {
      // Destructure key and value from every parameter
      const [key, value] = parameter
      // If value is array call function that validate array
      if (Array.isArray(value)) valid = validateArray(valid, key, value)
      // If value is simple and false call function which return invalid value
      else if (value === undefined) {
        valid = invalid(key)
        return valid
      }
      return valid
    },
    // Default isValid value
    { validated: true }
  )

  // Handling errors and display their
  try {
    if (!isValid.validated)
      throw new Error(
        `${isValid.invalidField} is not provided to the ${method} method`
      )
  } catch (err) {
    console.error(err)
  }
}

export default validate
