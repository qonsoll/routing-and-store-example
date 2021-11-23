import { RECORD_TYPES } from '../__constants__'

const { ORDERED, STRUCTURED } = RECORD_TYPES

const useRemoveRecord = (dispatch) => {
  const removeRecord = ({ collectionPath, id }) => {
    const payload = { collectionPath, id }
    dispatch({ type: 'removeRecord', payload: { ...payload, type: ORDERED } })
    dispatch({
      type: 'removeRecord',
      payload: { ...payload, type: STRUCTURED }
    })
  }

  return removeRecord
}

export default useRemoveRecord
