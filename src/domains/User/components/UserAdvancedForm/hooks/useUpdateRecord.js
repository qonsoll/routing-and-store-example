import { useCallback } from 'react'
import { useStore, useMutations } from 'services/qonsoll-data/Store'
import moment from 'moment'
import pluralize from 'pluralize'
import _ from 'lodash'
import { usePutRecord } from './'

/**
 * Hook return method that helps to update a record
 * @param {object} updatedDocument object that has document id and modelName
 * @param {array} relationshipModels array of the relationship model names
 */
const useUpdateRecord = (updatedObject, relationshipModels) => {
  // Getting a runtime storage for working with cache
  const { runtimeStorage } = useStore()
  // Getting a update mutation for creating a new document
  const { update } = useMutations()
  // Getting putRecord method that decide create new or update existing document
  const putRecord = usePutRecord()

  const updateRecord = useCallback(() => {
    // Destructuring id and model name from updating document
    const { id, modelName } = updatedObject
    // Pluralize model name
    const normalizedModelName = modelName && pluralize(modelName)

    // Query for runtime storage that getting new document data
    const objectQuery = `unsaved.${normalizedModelName}.${id}`
    // Query for runtime storage that getting old document data
    const oldObjectQuery = `structured.${normalizedModelName}.${id}`

    // Getting a new document data from cache by query
    const objectData = id && modelName && runtimeStorage.get(objectQuery)
    // Getting a old document data from cache by query
    const oldObjectData = runtimeStorage.get(oldObjectQuery)

    // Merge old and new document data
    const resultData = _.merge(oldObjectData || {}, objectData || {})

    console.log('result data', resultData)

    // If field type is moment format it to string
    const resultKeys = resultData && Object.keys(resultData)
    resultKeys?.forEach((key) => {
      if (moment.isMoment(resultData[key]))
        resultData[key] = moment(resultData[key]).format('YYYY-MM-DD')
    })

    //Updating parent document if data exist
    resultData && update(normalizedModelName, id, resultData)

    // Update document for every relationship model
    relationshipModels?.forEach((relationshipModel) => {
      // Getting all model ids
      const relationshipIds = Object.keys(
        runtimeStorage.get(`unsaved.${pluralize(relationshipModel)}`) || {}
      )
      relationshipIds?.forEach((relationshipId) => {
        // For every id getting dat
        const relationshipData = runtimeStorage.get(
          `unsaved.${pluralize(relationshipModel)}.${relationshipId}`
        )

        // If data exist update a document
        relationshipData &&
          putRecord(
            pluralize(relationshipModel),
            relationshipId,
            relationshipData
          )
      })
    })
  }, [putRecord, relationshipModels, runtimeStorage, update, updatedObject])

  return updateRecord
}

export default useUpdateRecord
