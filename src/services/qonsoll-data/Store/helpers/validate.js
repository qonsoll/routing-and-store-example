/**
 * Validates values
 * @param {string} method - method that calls validation
 * @param {object} values - values that should be validated
 */

const invalid = (key) => {
  const invalidValue = { validated: false, invalidField: key }
  return invalidValue
}

const validate = (method, values) => {
  console.log(values)
  const isValid = Object.entries(values).reduce(
    (valid, parameter) => {
      const [key, value] = parameter
      if (Array.isArray(value)) {
        value.forEach((arrayItem) => {
          if (!arrayItem) {
            valid = invalid(key)
            return valid
          } else return valid
        })
      } else {
        if (!value) {
          valid = invalid(key)
          return valid
        } else return valid
      }
      return valid
    },
    { validated: true }
  )
  try {
    if (!isValid.validated) {
      throw new Error(
        `${isValid.invalidField} is not provided to the ${method} method`
      )
    }
  } catch (err) {
    console.error(err)
  }
  return isValid.validated
}

export default validate
