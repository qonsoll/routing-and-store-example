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
  useUpdateRecord
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
  const filterRecords = useFilterRecords(dispatch)
  const findRecord = useFindRecord(store)
  const getDirtyAttributes = useGetDirtyAttributes(dispatch)
  const removeRecord = useRemoveRecord(dispatch)
  const rollbackAttributes = useRollbackAttributes(store, dispatch)
  const saveRecord = useSaveRecord(store, dispatch)
  const updateRecord = useUpdateRecord(store, dispatch)

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
        useGetId
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
