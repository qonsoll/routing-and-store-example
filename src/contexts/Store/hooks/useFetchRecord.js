import { firestoreService } from 'services/firebase'
import { RECORD_TYPES } from '../__constants__'

const { getDocument } = firestoreService
const { ORDERED, STRUCTURED } = RECORD_TYPES

const useFetchRecord = (dispatch) => {
  const fetchRecord = async ({ collectionPath, id }) => {
    const object = await getDocument(collectionPath, id)
    const payload = {
      collectionPath,
      id,
      values: { ...object }
    }
    await dispatch({
      type: 'updateRecord',
      payload: { type: ORDERED, ...payload }
    })
    await dispatch({
      type: 'updateRecord',
      payload: { type: STRUCTURED, ...payload }
    })
  }

  return fetchRecord
}

export default useFetchRecord
