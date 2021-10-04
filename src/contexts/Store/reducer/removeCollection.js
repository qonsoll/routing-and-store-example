import { RECORD_TYPES } from '../__constants__'

const removeCollection = (state, payload) => {
  try {
    const { type, collectionPath } = payload

    // Validation
    if (!RECORD_TYPES[type]) {
      throw new Error('No type provided to the removeCollection (reducer)')
    }

    const stateCopy = state
    delete stateCopy[type][collectionPath]
    return stateCopy
  } catch (err) {
    // Handling errors
    console.error(err)
  }
}

export default removeCollection
