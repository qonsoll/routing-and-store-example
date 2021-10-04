import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const createRecord = (state, payload) => {
  const { type, collectionPath, id, values } = payload

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
    stateCopy[type][collectionPath].push(values)
  } else {
    stateCopy[type][collectionPath][id] = values
  }

  return { ...stateCopy }
}

export default createRecord
