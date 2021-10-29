import { RECORD_TYPES } from '../__constants__'

const { ORDERED, DIRTY } = RECORD_TYPES

const removeRecord = (state, payload) => {
  const { type, collectionPath, id } = payload
  try {
    // Validation
    if (!RECORD_TYPES[type.toUpperCase()]) {
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
    const recordIndex = stateCopy[type][collectionPath].findIndex(
      (record) => record.id === id
    )
    if (!stateCopy[DIRTY][collectionPath]) {
      stateCopy[DIRTY][collectionPath] = {}
    }
    stateCopy[DIRTY][collectionPath][id] =
      stateCopy[type][collectionPath][recordIndex]
    stateCopy[type][collectionPath].splice(recordIndex, 1)
  } else {
    console.log()
    delete stateCopy[type][collectionPath][id]
  }
  return stateCopy
}

export default removeRecord
