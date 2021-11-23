import { useState, useEffect } from 'react'
import useStore from '../useStore'
import useRecordData from '../useRecordData'

const useGetInitialValues = (recordData) => {
  const [initialValues, setInitialValues] = useState(null)
  const { fetchRecord, findRecord, models } = useStore()
  const { id, modelName } = recordData

  useEffect(() => {
    const getInitialData = async () => {
      /**
       * If recordId provided (means that data was saved previously) - find
       * data in the store (cache) or make request to the database. Otherwise,
       * use default values from the specific model
       */
      const initialValues = id
        ? findRecord(recordData) || (await fetchRecord(recordData))
        : models[modelName].defaultValues

      // Set initial values
      setInitialValues(initialValues)
    }
    !initialValues && getInitialData()
  }, [
    id,
    findRecord,
    fetchRecord,
    recordData,
    models,
    modelName,
    initialValues
  ])

  return initialValues
}

const transformModelToState = (model, initialValues) => {
  const state = {}

  Object.keys(model.fields).forEach((field) => {
    const { type, dataType, defaultValue } = model.fields[field]
    state[field] = {}
    state[field].type = type || null
    state[field].dataType = dataType || null
    state[field].value = initialValues?.[field] || defaultValue || null
  })

  return state
}

const transformFieldsToState = (model, fields) => {
  const state = {}

  Object.keys(fields).forEach((field) => {
    const { type, dataType, defaultValue } = model.fields[field]
    state[field] = {}
    state[field].type = type || null
    state[field].dataType = dataType || null
    state[field].value = fields?.[field]
  })

  return state
}

const transformStateToFormValues = (state) => {
  const formValues = {}

  state &&
    Object.keys(state).forEach((field) => {
      formValues[field] = state[field].value
    })

  return formValues
}

const useFormState = ({ modelName, initialValues }) => {
  const [state, setState] = useState()
  const { models } = useStore()
  const model = models[modelName]

  useEffect(() => {
    const newState = transformModelToState(model, initialValues)
    setState(newState)
  }, [models, modelName, initialValues])

  const set = (field, value) => {
    setState({
      ...state,
      [field]: {
        ...state[field],
        value
      }
    })
  }
  const add = (field, value) => {
    setState({
      ...state,
      [field]: [...state[field], value]
    })
  }

  const setFields = (fields) => {
    const transformedFields = transformFieldsToState(model, fields)
    setState({
      ...state,
      ...transformedFields
    })
  }

  return { state, set, add, setFields }
}

const useSetFormValues = ({ form, state }) => {
  useEffect(() => {
    const formValues = transformStateToFormValues(state)
    form.setFieldsValue(formValues)
  }, [form, state])
}

// const useOnFormValuesChange = ({ recordData }) => {
//   const { addRecord, models } = useStore()
//   const onFormValuesChange = (changedValues, allValues) => {
//     // Get specific model data
//     const model = models[recordData.modelName]

//     // Adding record to the store using addRecord method (from store provider)
//     addRecord({
//       ...recordData,
//       values: {
//         ...model.defaultValues,
//         ...allValues
//       }
//     })

//     return onFormValuesChange
//   }
// }

const useAdvancedForm = (modelName, recordId, form) => {
  const recordData = useRecordData({ modelName, recordId })
  const initialValues = useGetInitialValues(recordData)
  const { state, set, add, setFields } = useFormState({
    modelName,
    initialValues
  })
  useSetFormValues({ form, state })

  return {
    state,
    set,
    add,
    setFields
  }
}

export default useAdvancedForm
