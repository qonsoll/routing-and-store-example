import useStore from '../useStore'

/*
 This hook returns method that helps to rollback form state to the initial state
*/
const useRollbackChanges = ({ recordData, recordId, modelName, form }) => {
  const { rollbackAttributes, findRecord, models } = useStore()

  const rollbackChanges = () => {
    // Get specific model data
    const model = models[modelName]

    // Get initial values for specific model
    const initialValues = recordId
      ? findRecord(recordData)
      : model.defaultValues

    // Calls Store method rollbackAttribute that updates store object
    rollbackAttributes({
      ...recordData,
      values: initialValues
    })

    // Updating form fields
    form.setFieldsValue(initialValues)
  }

  return rollbackChanges
}

export default useRollbackChanges
