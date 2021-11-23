const getValidationRules = (fields) => {
  const validationRules = {}

  Object.keys(fields).forEach((field) => {
    validationRules[field] = []
    const { min, max, required, len, pattern, type, transform } = fields[field]
    const rules = { min, max, required, len, pattern, type, transform }

    Object.keys(rules).forEach((rule) => {
      if (rules[rule] !== undefined) {
        validationRules[field].push({ [rule]: rules[rule] })
      }
    })
  })

  return validationRules
}

export default getValidationRules
