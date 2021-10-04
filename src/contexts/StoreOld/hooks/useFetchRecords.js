/**
 * Making request to the database (collection) and adding items to the Store
 */

import pluralize from 'pluralize'
import { firestoreService } from 'services/firebase'

const { queryDocuments } = firestoreService

const useFetchRecords = (dispatch) => {
  const fetchRecords = async (model) => {
    const collection = pluralize(model)
    const data = await queryDocuments(collection)
    const payload = { collection, data }
    dispatch({ type: 'updateCollection', payload })
  }

  return fetchRecords
}

export default useFetchRecords
