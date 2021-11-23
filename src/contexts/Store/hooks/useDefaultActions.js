import useStore from './useStore'
import useRecordData from './useRecordData'

const useDefaultActions = ({ modelName, recordId }) => {
  const {
    removeRecord,
    destroyRecord,
    destroyDirty,
    updateRecord,
    saveRecord
  } = useStore()

  const recordData = useRecordData({ modelName, recordId })

  const remove = () => removeRecord(recordData)
  const destroy = () => destroyRecord(recordData)
  const destroyDirtyRecords = () =>
    destroyDirty({ collectionPath: recordData.collectionPath })
  const save = () =>
    recordId ? updateRecord(recordData) : saveRecord(recordData)

  return {
    remove,
    destroy,
    destroyDirtyRecords,
    save
  }
}

export default useDefaultActions
