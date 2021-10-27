import { RECORD_TYPES } from './../__constants__'

const { STRUCTURED, DIRTY } = RECORD_TYPES

const useRollbackAttributes = (store, dispatch) => {
  const rollbackAttributes = ({ collectionPath, id }) => {
    const clone = JSON.parse(JSON.stringify(store))

    const documentData = clone[STRUCTURED][collectionPath][id]
    // replace dirty with structured
    dispatch({
      type: 'updateRecord',
      payload: { type: DIRTY, collectionPath, id, values: documentData }
    })

    // TODO: refresh form
  }
  return rollbackAttributes
  // кнопка в едіт. жмяк -> всі інпути стають такими як були при вході.
}

export default useRollbackAttributes
