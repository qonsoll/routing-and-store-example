import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { STRUCTURED, ORDERED, DIRTY } = RECORD_TYPES

const { createDocument } = firestoreService

const useSaveRecord = (store, dispatch) => {
  const saveRecord = ({ collectionPath, id }) => {
    const clone = JSON.parse(JSON.stringify(store))
    const documentData = clone[DIRTY][collectionPath][id]

    createDocument(collectionPath, id, documentData)

    dispatch({
      type: 'createRecord',
      payload: { type: STRUCTURED, collectionPath, id, values: documentData }
    })
    dispatch({
      type: 'createRecord',
      payload: { type: ORDERED, collectionPath, id, values: documentData }
    })
    dispatch({
      type: 'removeRecord',
      payload: { type: DIRTY, collectionPath, id }
    })
  }

  return saveRecord
}

export default useSaveRecord
