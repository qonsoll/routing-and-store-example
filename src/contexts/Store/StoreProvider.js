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

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    ordered: {},
    structured: {},
    dirty: {}
  })
  const addRecord = useAddRecord(dispatch)
  const destroyRecord = useDestroyRecord(dispatch)
  const fetchRecord = useFetchRecord(dispatch)
  const fetchRecords = useFetchRecords(dispatch)
  const filterRecords = useFilterRecords(store, dispatch)
  const findRecord = useFindRecord(store)
  const getDirtyAttributes = useGetDirtyAttributes(store)
  const removeRecord = useRemoveRecord(dispatch)
  const rollbackAttributes = useRollbackAttributes(store, dispatch)
  const saveRecord = useSaveRecord(store, dispatch)
  const updateRecord = useUpdateRecord(store, dispatch)
  const destroyDirty = useDestroyDirty(dispatch)


  console.log('store ->', store)

  return (
    <StoreContext.Provider
      value={{
        store,
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
