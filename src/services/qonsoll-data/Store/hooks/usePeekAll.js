import { useState, useEffect, useMemo, useRef } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import useStore from '../useStore'
import { peekAll, construct } from '../methods'

/**
 * Method helps to peek all data by query from cache
 * @param {string} query graphql like query
 * @param {object} options options object
 * (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean, disableConstruct: boolean, disableCacheUpdate: boolean)
 * @returns [documents, error]
 */
const usePeekAll = (query, config) => {
  // Extracting runtime storage and models from StoreContext
  const { runtimeStorage, models } = useStore()

  // Result document
  const documents = useRef()
  const [error] = useState(null)
  const [loading, setLoading] = useState(true)

  // Extracting entry collection name
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )

  useEffect(() => {
    const peekAllFetcher = async () => {
      // Peek all data from cache
      const dbData = await peekAll({ query, runtimeStorage, models })

      // Construct data to the nested objects
      const constructedData = config?.disableConstruct
        ? dbData
        : construct(dbData, query, models)
      if (constructedData)
        // Update result documents
        documents.current = constructedData?.[queryCollection]

      // Disable loading
      setLoading(false)
    }
    if (!config?.disablePeek && query) peekAllFetcher()
  }, [
    models,
    queryCollection,
    runtimeStorage,
    query,
    config?.disablePeek,
    config?.disableConstruct
  ])

  return [documents.current, loading, error]
}

export default usePeekAll
