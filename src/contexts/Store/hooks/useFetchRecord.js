import { firestoreService } from 'services/firebase'
import { RECORD_TYPES } from '../__constants__'

const { getDocument } = firestoreService
const { ORDERED } = RECORD_TYPES

const useFetchRecord = (dispatch) => {
  const fetchRecord = async ({ collectionPath, id }) => {
    const object = await getDocument(collectionPath, id)
    const payload = {
      type: ORDERED,
      collectionPath,
      id,
      values: { ...object }
    }
    dispatch({ type: 'updateRecord', payload })
  }

  return fetchRecord
}

export default useFetchRecord
