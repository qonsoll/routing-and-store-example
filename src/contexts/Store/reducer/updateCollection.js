import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const updateCollection = (state, payload) => {
  const { type, collectionPath, records } = payload

  // Creating copy of the state
  const stateCopy = JSON.parse(JSON.stringify(state))

  // Assigning default values if not exists
  stateCopy[type][collectionPath] = stateCopy[type][collectionPath]
    ? stateCopy[type][collectionPath]
    : type === ORDERED
    ? []
    : {}

  // Creating record
  if (type === ORDERED) {
    stateCopy[type][collectionPath] = records
  } else {
    records.forEach((record) => {
      stateCopy[type][collectionPath][record.id] = record
    })
  }

  return stateCopy
}

export default updateCollection
