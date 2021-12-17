import { useState, useEffect, useMemo, useRef } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import useStore from '../useStore'
import { peekRecord, construct } from '../methods'

/**
 * Method helps to peek record data by query from cache
 * @param {string} query graphql like query
 * @param {object} options options object
 * (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean, disableConstruct: boolean, disableCacheUpdate: boolean)
 * @returns [documents, error]
 */
const usePeekRecord = (query, options) => {
  // Extracting runtime storage and models from StoreContext
  const { runtimeStorage, models } = useStore()

  // Result document
  const document = useRef([])
  const [error] = useState(null)

  // Extracting entry collection name
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )

  useEffect(() => {
    const recordPeeker = async () => {
      // Peek record data from cache
      const cacheData = await peekRecord({ query, runtimeStorage, models })

      // Construct data to the nested objects
      const constructedData = options?.disableConstruct
        ? cacheData
        : construct(cacheData, query, models)

      // Update result documents
      if (constructedData) document.current = constructedData?.[queryCollection]
    }
    if (!options?.disablePeek && query) recordPeeker()
  }, [
    models,
    queryCollection,
    runtimeStorage,
    query,
    options?.disablePeek,
    options?.disableConstruct
  ])

  return [document.current, error]
}

export default usePeekRecord
