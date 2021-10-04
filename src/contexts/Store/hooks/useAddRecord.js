import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { DIRTY } = RECORD_TYPES

const { getId } = firestoreService

const useAddRecord = (dispatch) => {
  const addRecord = ({ collectionPath, id, values }) => {
    const recordId = id || getId(collectionPath)
    const valuesExtended = { id: recordId, ...values }
    const payload = {
      type: DIRTY,
      collectionPath,
      id: recordId,
      values: valuesExtended
    }

    dispatch({ type: 'createRecord', payload })
  }

  return addRecord
}

export default useAddRecord
