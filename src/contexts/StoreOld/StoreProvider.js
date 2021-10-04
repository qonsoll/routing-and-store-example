import { useReducer } from 'react'
import pluralize from 'pluralize'
import StoreContext from './StoreContext'
import { storeReducer } from './reducer'
import {
  useAddRecord,
  useCreateRecord,
  useFetchRecords,
  useDestroyRecord,
  useGetId,
  useUpdateRecord
} from './hooks'

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, {})
  const addRecord = useAddRecord(dispatch)
  const createRecord = useCreateRecord(dispatch)
  const fetchRecords = useFetchRecords(dispatch)
  const destroyRecord = useDestroyRecord(dispatch)
  const updateRecord = useUpdateRecord(dispatch)

  const findRecord = (model, id) => {
    const modelPluralized = pluralize(model)
    return store[modelPluralized][id]
  }

  console.log('store ->', store)

  return (
    <StoreContext.Provider
      value={{
        store,
        updateRecord,
        addRecord,
        createRecord,
        fetchRecords,
        findRecord,
        destroyRecord,
        useGetId
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

/**
 Store
  .findRecord
  .query
  .createRecord

  Model
    .deleteRecord
    .destroyRecord
    .get
    .set
    .changedAttributes
    .save
    .rollbackAttributes
    
 */
