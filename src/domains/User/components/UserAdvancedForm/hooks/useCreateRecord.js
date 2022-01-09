import { useCallback } from 'react'
import { useStore, useMutations } from 'services/qonsoll-data/Store'
import moment from 'moment'
import pluralize from 'pluralize'

/**
 * Hook return method that helps to create new record
 * @param {object} updatedDocument object that has document id and modelName
 * @param {array} relationshipModels array of the relationship model names
 */
const useCreateRecord = (updatedDocument, relationshipModels) => {
  // Getting a runtime storage for working with cache
  const { runtimeStorage } = useStore()
  // Getting a add mutation for creating a new document
  const { add } = useMutations()

  const createRecord = useCallback(() => {
    // Destructuring id and model name from creating document
    const { id, modelName } = updatedDocument
    console.log(updatedDocument)
    // Pluralize model name
    const normalizedModelName = modelName && pluralize(modelName)

    // Query for runtime storage that getting new document data
    const documentQuery = `unsaved.${normalizedModelName}.${id}`

    // Getting a document data from cache by query
    const documentData = id && modelName && runtimeStorage.get(documentQuery)
    const resultData = documentData || {}

    // If field type is moment format it to string
    const resultKeys = resultData && Object.keys(resultData)
    resultKeys?.forEach((key) => {
      if (moment.isMoment(resultData[key]))
        resultData[key] = moment(resultData[key]).format('YYYY-MM-DD')
    })

    //Creating parent document if data exist
    resultData && add(normalizedModelName, id, resultData)

    // Create document for every relationship model
    relationshipModels?.forEach((relationshipModel) => {
      // Getting all model ids
      const relationshipIds = Object.keys(
        runtimeStorage.get(`unsaved.${pluralize(relationshipModel)}`) || {}
      )
      relationshipIds?.forEach((relationshipId) => {
        // For every id getting data
        const relationshipData = runtimeStorage.get(
          `unsaved.${pluralize(relationshipModel)}.${relationshipId}`
        )
        // If data exist create new document
        relationshipId &&
          add(pluralize(relationshipModel), relationshipId, relationshipData)
      })
    })
  }, [add, relationshipModels, runtimeStorage, updatedDocument])

  return createRecord
}

export default useCreateRecord
