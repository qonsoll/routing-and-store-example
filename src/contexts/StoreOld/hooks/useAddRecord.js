/**
 * Add record to the Store state without saving to the database
 */

import pluralize from 'pluralize'
import { firestoreService } from 'services/firebase'

const { getId } = firestoreService

const useAddRecord = (dispatch) => {
  const addRecord = (model, data) => {
    const modelPluralized = pluralize(model)
    const _id = getId(modelPluralized)
    const payload = { _id, _typeOf: modelPluralized, ...data }

    dispatch({ type: 'addRecord', payload })
  }

  return addRecord
}

export default useAddRecord
