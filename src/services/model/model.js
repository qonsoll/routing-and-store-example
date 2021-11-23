const model = (name, fields, validationSchema) => {
  try {
    if (!name) throw new Error('No name provided to the model method')
    if (!fields) throw new Error('No fields provided to the model method')
  } catch (e) {
    console.error(e)
  }

  return {
    name,
    fields,
    validationSchema: validationSchema
  }
}

export default model
