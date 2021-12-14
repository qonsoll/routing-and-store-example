import { useState, useEffect, useMemo, useRef } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import useStore from '../useStore'
import { peekRecord, construct } from '../methods'

const usePeekRecord = (query, config, disabled) => {
  const { runtimeStorage, models } = useStore()
  const [error] = useState(null)
  const [loading, setLoading] = useState(true)
  const documents = useRef()

  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )

  useEffect(() => {
    const peekAllFetcher = async () => {
      const dbData = await peekRecord({ query, runtimeStorage, models })

      const constructedData = config?.disableConstruct
        ? dbData
        : construct(dbData, query, models)
      if (constructedData)
        documents.current = constructedData?.[queryCollection]

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

export default usePeekRecord
