import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const updateRecord = (state, payload) => {
  try {
    const { type, collectionPath, id, values } = payload

    // Validation
    // ?this validation is not working because you trying to find property by value,
    // ?but you should find by name of prop
    //
    // if (!RECORD_TYPES[type]) {
    //   throw new Error('No type provided to the updateRecord (reducer)')
    // }
    // there not beautifull but working validation
    // Object.values(RECORD_TYPES).indexOf(type) > -1

    // TODO: check for existing element in DIRTY

    if (!collectionPath) {
      throw new Error(
        'No collectionPath provided to the updateRecord (reducer)'
      )
    }

    if (!id) {
      throw new Error('No id provided to the createRecord (reducer)')
    }

    if (!values) {
      throw new Error('No values provided to the updateRecord (reducer)')
    }

    // Creating copy of the state
    const stateCopy = JSON.parse(JSON.stringify(state))

    // Assigning default values if not exists
    stateCopy[type][collectionPath] = stateCopy[type][collectionPath]
      ? stateCopy[type][collectionPath]
      : type === ORDERED
      ? []
      : {}

    // Deleting record depending on its type
    if (type === ORDERED) {
      const recordIndex = stateCopy[type][collectionPath].findIndex(
        (record) => record._id === id
      )
      stateCopy[type][collectionPath][recordIndex] = {
        ...stateCopy[type][collectionPath][recordIndex],
        ...values
      }
    } else {
      stateCopy[type][collectionPath][id] = {
        ...stateCopy[type][collectionPath][id],
        ...values
      }
    }
    return { ...stateCopy }
  } catch (err) {
    // Handling errors
    console.error(err)
  }
}

export default updateRecord
