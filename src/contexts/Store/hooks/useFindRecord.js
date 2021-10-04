import { RECORD_TYPES } from '../__constants__'

const { STRUCTURED } = RECORD_TYPES

const useFindRecord = (store) => {
  const findRecord = ({ collectionPath, id }) => {
    return (
      store[STRUCTURED] &&
      store[STRUCTURED][collectionPath] &&
      store[STRUCTURED][collectionPath][id]
    )
  }

  return findRecord
}

export default useFindRecord
