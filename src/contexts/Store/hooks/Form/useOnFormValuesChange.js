import useStore from '../useStore'

// Returns method that will work as callback after form updating
const useOnFormValuesChange = ({ recordData, modelName }) => {
  const { addRecord, models } = useStore()
  const onFormValuesChange = (changedValues, allValues) => {
    // Get specific model data
    const model = models[modelName]

    // Adding record to the store using addRecord method (from store provider)
    addRecord({
      ...recordData,
      values: {
        ...model.defaultValues,
        ...allValues
      }
    })
  }

  return onFormValuesChange
}

export default useOnFormValuesChange
