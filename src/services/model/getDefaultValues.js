const getDefaultValues = (fields) => {
  const defaultValues = {}

  Object.keys(fields).forEach((field) => {
    defaultValues[field] = fields[field].defaultValue || null
  })

  return defaultValues
}

export default getDefaultValues
