import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const removeRecord = (state, payload) => {
  const { type, collectionPath, id } = payload
  try {
    // Validation
    if (!RECORD_TYPES[type]) {
      throw new Error('No type provided to the removeRecord (reducer)')
    }
  } catch (err) {
    // Handling errors
    console.error(err)
  }

  // Creating copy of the state
  const stateCopy = state

  // Deleting record depending on its type
  if (type === ORDERED) {
    const recordIndex = stateCopy[collectionPath].findIndex(
      (record) => record._id === id
    )
    stateCopy[collectionPath].splice(recordIndex, 1)
  } else {
    delete stateCopy[type][collectionPath][id]
  }

  return { ...stateCopy }
}

export default removeRecord
