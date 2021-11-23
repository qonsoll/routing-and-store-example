import { useState, useEffect } from 'react'
import useStore from '../useStore'

/*
  This hook initializes form state and sets default values
*/
const useInitializeForm = ({ form, recordId, modelName, recordData }) => {
  const [initialized, setInitialized] = useState(false)
  const { fetchRecord, findRecord, models } = useStore()

  useEffect(() => {
    const setInitialValues = async () => {
      /**
       * If recordId provided (means that data was saved previously) - find
       * data in the store (cache) or make request to the database. Otherwise,
       * use default values from the specific model
       */
      const initialValues = recordId
        ? findRecord(recordData) || (await fetchRecord(recordData))
        : models[modelName].defaultValues

      // This method updates antd form state
      form.setFieldsValue(initialValues)

      // Mark form as initialized
      setInitialized(true)
    }
    !initialized && setInitialValues()
  }, [
    recordId,
    findRecord,
    fetchRecord,
    recordData,
    form,
    initialized,
    models,
    modelName
  ])
}

export default useInitializeForm
