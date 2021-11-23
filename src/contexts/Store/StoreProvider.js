import { useReducer } from 'react'
import StoreContext from './StoreContext'
import reducer from './reducer'
import {
  useAddRecord,
  useDestroyRecord,
  useFetchRecord,
  useFetchRecords,
  useFilterRecords,
  useFindRecord,
  useGetDirtyAttributes,
  useGetId,
  useRemoveRecord,
  useRollbackAttributes,
  useSaveRecord,
  useUpdateRecord,
  useDestroyDirty
} from './hooks'

const StoreProvider = ({ children, models }) => {
  const [store, dispatch] = useReducer(reducer, {
    ordered: {},
    structured: {},
    dirty: {}
  })
  // CREATE/UPDATE
  // Add record to the store without saving
  const addRecord = useAddRecord(dispatch)
  // Update record in DB and remove from dirty records
  const updateRecord = useUpdateRecord(store, dispatch)
  // Save dirty record to the DB
  const saveRecord = useSaveRecord(store, dispatch)

  /**
   * TODO
   * ===========================
   * 1. Save all dirty
   * 2. Validate record using model
   * 3. Add sorting
   */

  // REMOVE
  // Remove record from store only
  const removeRecord = useRemoveRecord(dispatch)
  // Remove record from the DB and store
  const destroyRecord = useDestroyRecord(dispatch)

  // GET
  // Fetch one record from the database and update store
  const fetchRecord = useFetchRecord(dispatch)
  // Fetch many records from the database and update store
  const fetchRecords = useFetchRecords(dispatch)
  // Filter records from local store
  const filterRecords = useFilterRecords(store, dispatch)
  // Find record in local store
  const findRecord = useFindRecord(store)

  // DIRTY
  // Get dirty attributes from the local store
  const getDirtyAttributes = useGetDirtyAttributes(store, findRecord, models)
  // Rollback changes to the committed state
  const rollbackAttributes = useRollbackAttributes(store, dispatch)
  // Remove all records added to dirty remove from the DB
  const destroyDirty = useDestroyDirty(dispatch)

  console.log('store ->', store)

  return (
    <StoreContext.Provider
      value={{
        store,
        models,
        addRecord,
        destroyRecord,
        fetchRecord,
        fetchRecords,
        filterRecords,
        findRecord,
        getDirtyAttributes,
        removeRecord,
        rollbackAttributes,
        saveRecord,
        updateRecord,
        useGetId,
        destroyDirty
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
