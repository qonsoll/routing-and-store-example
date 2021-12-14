import { peekAll, peekRecord, findAll, findRecord } from '../methods'
import useStore from '../useStore'

/**
 * Method returns hooks for working with db or cache data
 */
const useQueries = () => {
  const { runtimeStorage, defaultAdapter, models } = useStore()

  // Queries for working with cache
  const peekAllQuery = (query) => peekAll({ query, runtimeStorage, models })
  const peekRecordQuery = (query) =>
    peekRecord({ query, runtimeStorage, models })

  // Queries for working with DB
  const findAllQuery = (query) =>
    findAll({ query, adapter: defaultAdapter, models })
  const findRecordQuery = (query) =>
    findRecord({ query, adapter: defaultAdapter, models })

  return {
    peekAllQuery,
    peekRecordQuery,
    findAllQuery,
    findRecordQuery
  }
}

export default useQueries
