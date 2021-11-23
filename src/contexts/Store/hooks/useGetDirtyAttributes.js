import { RECORD_TYPES } from '../__constants__'

const { DIRTY } = RECORD_TYPES

const useGetDirtyAttributes = (store, findRecord, models) => {
  const getDirtyAttributes = ({ store, modelName, collectionPath, id }) => {
    // Get specific model data
    const model = models[modelName]

    // Get initial values for specific model
    const initialObject =
      findRecord({ collectionPath, id }) || model?.defaultValues

    const dirtyObject = store?.[DIRTY]?.[collectionPath]?.[id]
    const dirtyAttributes = []

    if (dirtyObject && initialObject) {
      Object.keys(initialObject).forEach((item) => {
        initialObject[item] !== dirtyObject[item] && dirtyAttributes.push(item)
      })
    }
    return dirtyAttributes.length ? dirtyAttributes : null
  }

  return getDirtyAttributes
}

export default useGetDirtyAttributes
