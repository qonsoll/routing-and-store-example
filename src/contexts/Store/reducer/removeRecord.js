import { RECORD_TYPES } from '../__constants__'

const { ORDERED } = RECORD_TYPES

const removeRecord = (state, payload) => {
  const { collectionPath, id, type } = payload

  // Creating copy of the state
  const stateCopy = JSON.parse(JSON.stringify(state))

  if (type === ORDERED) {
    stateCopy[type][collectionPath] = stateCopy[type][collectionPath].filter(
      (item) => item.id !== id
    )
  } else {
    if (stateCopy[type][collectionPath][id]) {
      delete stateCopy[type][collectionPath][id]
    }
  }

  return { ...stateCopy }
}

export default removeRecord
