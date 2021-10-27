import { RECORD_TYPES } from '../__constants__'

const { DIRTY, STRUCTURED } = RECORD_TYPES

const useGetDirtyAttributes = (store) => {
  const getDirtyAttributes = ({ collectionPath, id }) => {
    const initialObject = store[STRUCTURED][collectionPath][id]
    const dirtyObject = store[DIRTY][collectionPath]?.[id]
    const dirtyAttributes = []

    if (dirtyObject) {
      Object.keys(initialObject).map((item) => {
        if (initialObject[item] !== dirtyObject[item])
          dirtyAttributes.push(item)
      })
    }
    console.log(dirtyAttributes)
  }

  return getDirtyAttributes
}

export default useGetDirtyAttributes
