import useInitializeForm from './useInitializeForm'
import useRecordData from '../useRecordData'
import useIsDirtyModel from './useIsDirtyModel'
import useRollbackChanges from './useRollbackChanges'
import useOnFormValuesChange from './useOnFormValuesChange'
import useTransformModelToState from './useTransformModelToState'

/*
  This hook will help to work with forms using store.
  Initialize form, update values, rollback changes.
*/
const useStoreForm = ({ modelName, form, recordId }) => {
  // Building record data object { collectionPath, id }
  const recordData = useRecordData({ modelName, recordId })

  // EXPERIMENTAL
  const [state, setState] = useTransformModelToState({ modelName })
  console.log('transformedModel ->', state)

  // Initializing form and setting default values from model or database
  useInitializeForm({ modelName, form, recordId, recordData })

  // Check if form data is dirty (changed) or not
  const isDirty = useIsDirtyModel({ modelName, recordData })

  // Returns method for changes rollback
  const rollbackChanges = useRollbackChanges({
    recordData,
    recordId,
    modelName,
    form
  })

  // Listens for form values changes. Returns method
  const onFormValuesChange = useOnFormValuesChange({ recordData, modelName })

  return {
    id: recordData.id,
    isDirty,
    rollbackChanges,
    onFormValuesChange
  }
}

export default useStoreForm
