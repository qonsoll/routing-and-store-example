const DEFAULT_TYPE = 'relationship'
const DEFAULT_DATATYPE = 'belongsTo'

const belongsTo = (ref, options) => {
  try {
    if (!ref) throw new Error('No ref provided to the belongsTo method')
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

export default belongsTo
