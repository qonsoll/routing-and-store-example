import { useEffect, useState, useCallback } from 'react'
import useStore from '../useStore'
import pluralize from 'pluralize'

const useModel = (modelName) => {
  const { models, defaultAdapter } = useStore()
  const [model, setModel] = useState()
  const getModelData = useCallback(
    (modelName) => {
      const model = modelName && models[pluralize.singular(modelName)]
      const defaultValues = model?.validationSchema?.default()
      return {
        fields: model?.fields,
        defaultValues
      }
    },
    [models]
  )

  const getId = () => defaultAdapter.generateId(modelName)

  useEffect(() => {
    const modelData = modelName && getModelData(modelName)
    modelData && setModel(modelData)
  }, [getModelData, modelName])

  return [model, getId]
}

export default useModel
