/**
 * Update record in the dirty Store state without saving to the database
 */

import pluralize from 'pluralize'

const useUpdateRecord = (dispatch) => {
  const updateRecord = (model, id, data) => {
    const modelPluralized = pluralize(model)
    const payload = { _id: id, _typeOf: modelPluralized, ...data }

    dispatch({ type: 'updateRecord', payload })
  }

  return updateRecord
}

export default useUpdateRecord
