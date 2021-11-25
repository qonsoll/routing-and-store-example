import { useState, useEffect, useCallback } from 'react'
import useStore from '../useStore'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import { object } from 'yup/lib/locale'

const useFindAll = (query, config) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const transformCollectionToStructure = (docs) => {
    const result = {}
    docs &&
      docs.forEach((doc) => {
        result[doc.id] = doc
      })
    return result
  }

  const getBelongsToPromises = useCallback(
    (belongsToFields, doc) => {
      return belongsToFields.map((field) => {
        const path = pluralize(field)
        return doc[field] && defaultAdapter.findBelongsTo(path, doc[field])
      })
    },
    [defaultAdapter]
  )

  const getHasManyPromises = useCallback(
    async (hasManyFields, doc) => {
      return hasManyFields.map((field) => {
        const path = pluralize(field)
        return defaultAdapter.findHasMany(path, doc[field])
      })
    },
    [defaultAdapter]
  )

  const findAll = useCallback(
    async (query) => {
      let result = {}

      // Convert to json
      const queryJSON = graphQlQueryToJson(query)
      console.log(queryJSON)

      // Take model name
      const modelName = queryJSON?.query && Object.keys(queryJSON.query)[0]

      // Model name to singular
      const modelNameSingular = modelName && pluralize.singular(modelName)

      // Take model data
      const modelData = modelNameSingular && models[modelNameSingular]
      // console.log(modelData)

      // Get model from the database
      let documents = await defaultAdapter.findAll(modelName)

      // // Get requested fields
      // const requestedFields = getRequestedFields(queryJSON, modelName)

      // // Get all fields that have belongsTo relationship type (in model)
      // const belongsToFields = getBelongsToFields(requestedFields, modelData)

      // // Get all fields that have hasMany relationship type (in model)
      // const hasManyFields = getHasManyFields(requestedFields, modelData)

      // await documents?.forEach(async (doc) => {
      //   // console.log('document forEach', doc)
      //   const belongsToPromises = getBelongsToPromises(belongsToFields, doc)

      //   const hasManyPromises = getHasManyPromises(hasManyFields, doc)

      //   const belongsToData =
      //     Array.isArray(belongsToPromises) &&
      //     (await Promise.all(belongsToPromises.filter((item) => item !== null)))

      //   const hasManyData =
      //     Array.isArray(hasManyPromises) &&
      //     (await Promise.all(hasManyPromises.filter((item) => item !== null)))

      //   console.log('belongsToData', belongsToData)
      //   console.log('hasManyData', hasManyData)

      //   result[doc.id] = doc

      // })

      return result
    },
    [defaultAdapter, getHasManyPromises, getBelongsToPromises, models]
  )

  const getRequestedFields = (queryJSON, modelName) => {
    return (
      queryJSON?.query?.[modelName] && Object.keys(queryJSON.query[modelName])
    )
  }

  const getBelongsToFields = (requestedFields, modelData) => {
    return (
      requestedFields &&
      requestedFields.filter(
        (field) => modelData?.fields?.[field]?.dataType === 'belongsTo'
      )
    )
  }

  const getHasManyFields = (requestedFields, modelData) => {
    return (
      requestedFields &&
      requestedFields.filter(
        (field) => modelData?.fields?.[field]?.dataType === 'hasMany'
      )
    )
  }

  useEffect(() => {
    findAll(query).then((data) => {
      console.log('result only ->>>>>>', data)
    })
  }, [findAll, query])

  useEffect(() => {
    const smartDataFetcher = async () => {
      // Temporary get
      const runtimeStorageData = runtimeStorage.get(`structured.${query}`)
      const runtimeStorageDataExists =
        runtimeStorageData && !!Object.keys(runtimeStorageData)
      if (runtimeStorageDataExists) {
        setLoading(false)
        setDocuments(runtimeStorageData)
      } else {
        const dbData = await defaultAdapter.findAll(query)
        setLoading(false)
        setDocuments(dbData)
        if (dbData) {
          runtimeStorage.update(`structured.${query}`, dbData)
        }
      }
    }
    smartDataFetcher()
  }, [query, defaultAdapter, runtimeStorage])

  return [documents, loading, error]
}

export default useFindAll
