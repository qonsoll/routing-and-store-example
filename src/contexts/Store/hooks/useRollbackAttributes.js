import { RECORD_TYPES } from './../__constants__'

const { DIRTY } = RECORD_TYPES

const useRollbackAttributes = (store, dispatch) => {
  const rollbackAttributes = ({ collectionPath, id }) => {
    dispatch({
      type: 'removeRecord',
      payload: { type: DIRTY, collectionPath, id }
    })
  }
  return rollbackAttributes
}

export default useRollbackAttributes
