import { useMemo } from 'react'
import useStore from './useStore'

/*
  This hook helps to prepare basic record data:
  { collectionPath, id }
  where collectionPath should be relevant to the provided modelName
  and id could be received from the top level or generated
*/
const useRecordData = ({ modelName, recordId }) => {
  /* 
    Get list of all app models from the store context. 
    This list should be provided to Store Provider manually by developer 
  */
  const { models } = useStore()

  // Get specific model data from the models list
  const model = models[modelName]

  // Get or generate record id (model.newId will return new id for collection)
  const id = recordId || model.newId

  // Firestore collection path for specific model (auto pluralized)
  const collectionPath = model.collectionPath

  // Building result
  const recordData = useMemo(
    () => ({ collectionPath, id, modelName }),
    [collectionPath, id, modelName]
  )

  return recordData
}

export default useRecordData
