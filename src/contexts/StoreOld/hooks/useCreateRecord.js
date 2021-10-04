/**
 * Add record to the Store state with saving to the database
 */

import pluralize from 'pluralize'
import { firestoreService } from 'services/firebase'

const { createDocument, getId, getTimestamp } = firestoreService

const useCreateRecord = (dispatch) => {
  const createRecord = (model, data) => {
    const modelPluralized = pluralize(model)
    const _id = getId(modelPluralized)
    const _createdAt = getTimestamp()
    const payload = { _id, _createdAt, _typeOf: modelPluralized, ...data }

    dispatch({ type: 'createRecord', payload })

    createDocument(_id, modelPluralized, payload)
  }

  return createRecord
}

export default useCreateRecord
