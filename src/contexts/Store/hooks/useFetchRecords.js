import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { ORDERED, STRUCTURED } = RECORD_TYPES

const { queryDocuments } = firestoreService

const useFetchRecords = (dispatch) => {
  const fetchRecords = async ({ collectionPath }) => {
    const records = await queryDocuments(collectionPath)
    dispatch({
      type: 'updateCollection',
      payload: { type: ORDERED, collectionPath, records }
    })
    dispatch({
      type: 'updateCollection',
      payload: { type: STRUCTURED, collectionPath, records }
    })
  }

  return fetchRecords
}

export default useFetchRecords
