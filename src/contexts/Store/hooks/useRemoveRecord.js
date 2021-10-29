import { RECORD_TYPES } from '../__constants__'

const { DIRTY, ORDERED, STRUCTURED } = RECORD_TYPES

const useRemoveRecord = (dispatch) => {
  const removeRecord = ({ collectionPath, id }) => {
    const recordId = id
    const payload = {
      type: ORDERED,
      collectionPath,
      id: recordId
    }
    dispatch({ type: 'removeRecord', payload })
  }

  return removeRecord
}

export default useRemoveRecord
