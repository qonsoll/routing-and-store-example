const DEFAULT_TYPE = 'relationship'
const DEFAULT_DATATYPE = 'hasMany'

const hasMany = (ref, options) => {
  try {
    if (!ref) throw new Error('No ref provided to the hasMany method')
  } catch (e) {
    console.error(e)
  }
  return {
    type: DEFAULT_TYPE,
    dataType: DEFAULT_DATATYPE,
    ref,
    ...options
  }
}

export default hasMany
