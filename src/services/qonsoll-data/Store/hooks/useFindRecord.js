import { useMemo, useRef } from 'react'
import md5 from 'md5'
import usePeekRecord from './usePeekRecord'
import useFetchRecord from './useFetchRecord'
import useGetRefreshStatus from './useGetRefreshStatus'

/**
 * Method helps to find record data by query in cache or in DB
 * @param {string} query graphql like query
 * @param {object} config config object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @returns [document, loading, error]
 */
const useFindRecord = (query, config) => {
  // Extracting method for getting refresh status (if refresh is allowed or no)
  const getRefreshStatus = useGetRefreshStatus()
  console.log('getRefreshStatus', getRefreshStatus())

  // Generating queryHash for the saving to the runtime storage
  const queryHash = useMemo(() => query && md5(query), [query])

  // Check that is refresh allowed
  const isRefreshAllowed = useMemo(
    () =>
      config?.fetchInterval
        ? getRefreshStatus(queryHash, config?.fetchInterval)
        : false,
    [queryHash, config?.fetchInterval, getRefreshStatus]
  )

  // Peek record data from cache if needed
  const [cachedDocuments, cacheLoading] = usePeekRecord(query, {
    construct: config?.construct,
    disablePeek: config?.disablePeek
  })

  // Fetch record data from DB
  console.log(
    'needFetch ???',
    !isRefreshAllowed && (cacheLoading || Boolean(cachedDocuments))
  )
  const [dbDocuments, loading, error] = useFetchRecord(query, {
    disableFetch:
      (!isRefreshAllowed && (cacheLoading || Boolean(cachedDocuments))) ||
      config?.disableFetch,
    fetchInterval: config?.fetchInterval,
    forceIntervalRefresh: config?.forceIntervalRefresh,
    construct: config?.construct
  })

  // Result documents
  const documents = useRef([])

  // Update result document by data from DB or cache
  documents.current = dbDocuments?.length
    ? dbDocuments?.[0]
    : cachedDocuments?.[0]

  return [documents.current, loading, error]
}

export default useFindRecord
