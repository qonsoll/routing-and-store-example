import { DATA_TYPES } from './__constants__'

const DEFAULT_TYPE = 'attribute'

const attr = (dataType, options) => {
  try {
    if (!DATA_TYPES.includes(dataType))
      throw new Error('Incorrect dataType provided to the model')
  } catch (e) {
    console.error(e)
  }
  return {
    type: DEFAULT_TYPE,
    dataType,
    ...options
  }
}

export default attr
