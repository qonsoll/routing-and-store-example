import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const removeRecord = (state, payload) => {
  const { type, collectionPath, id } = payload
  try {
    // Validation
    // ?this validation is not working because you trying to find property by value,
    // ?but you should find by name of prop
    //
    // if (!RECORD_TYPES[type]) {
    //   throw new Error('No type provided to the updateRecord (reducer)')
    // }
    // there not beautifull but working validation
    // Object.values(RECORD_TYPES).indexOf(type) > -1

    if (!collectionPath) {
      throw new Error(
        'No collectionPath provided to the updateRecord (reducer)'
      )
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
    console.log()
    delete stateCopy[type][collectionPath][id]
  }

  return { ...stateCopy }
}

export default removeRecord
