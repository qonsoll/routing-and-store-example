import { useState, useEffect, useMemo, useRef } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import useStore from '../useStore'
import { filter, construct } from '../methods'

/**
 * Method helps to peek all data by query from cache using conditional rules
 * @param {string} query graphql like query
 * @param {object} options options object
 * (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean, disableConstruct: boolean, disableCacheUpdate: boolean)
 * @param {array} conditionals filter options
 * @returns [documents, error]
 */
const useFilter = (query, config, conditionals) => {
  // Extracting runtime storage and models from StoreContext
  const { runtimeStorage, models } = useStore()

  // Result documents
  const documents = useRef()
  const [error] = useState(null)

  // Extracting entry collection name
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )

  useEffect(() => {
    const filterPeeker = async () => {
      // Peek all data from runtime storage by conditionals
      const cacheData = await filter({
        query,
        runtimeStorage,
        models,
        conditionals
      })

      // Construct data to the nested objects
      const constructedData = config?.disableConstruct
        ? cacheData
        : construct(cacheData, query, models)
      if (constructedData)
        // Update result documents
        documents.current = constructedData?.[queryCollection]
    }
    if (!config?.disablePeek && query) filterPeeker()
  }, [
    models,
    queryCollection,
    runtimeStorage,
    query,
    conditionals,
    config?.disablePeek,
    config?.disableConstruct
  ])

  return [documents.current, error]
}

export default useFilter
