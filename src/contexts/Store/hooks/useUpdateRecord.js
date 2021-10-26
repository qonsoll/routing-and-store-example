import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { updateDocument } = firestoreService

const { STRUCTURED, ORDERED, DIRTY } = RECORD_TYPES

const useUpdateRecord = (store, dispatch) => {
  const updateRecord = ({ collectionPath, id }) => {
    const clone = JSON.parse(JSON.stringify(store))
    const documentData = clone[DIRTY][collectionPath][id]

    updateDocument(collectionPath, id, documentData)

    dispatch({
      type: 'updateRecord',
      payload: { type: STRUCTURED, collectionPath, id, values: documentData }
    })
    dispatch({
      type: 'updateRecord',
      payload: { type: ORDERED, collectionPath, id, values: documentData }
    })
    dispatch({
      type: 'removeRecord',
      payload: { type: DIRTY, collectionPath, id }
    })
  }

  return updateRecord
}

export default useUpdateRecord
