import { useState, useCallback } from 'react'
import useStore from '../useStore'

const useUpdateCache = () => {
  const [error, setError] = useState(null)
  const { runtimeStorage } = useStore()

  const updateCache = useCallback(
    async (queryHash, dbData) => {
      try {
        // Deep updating of the current state of the storage
        runtimeStorage.deepUpdate({ structured: dbData })
        // Updating meta data (when request was made)
        runtimeStorage.update(
          `queries.${queryHash}.requestedAt`,
          new Date().getTime()
        )
      } catch (err) {
        console.error(err)
        setError(err)
      }
    },
    [runtimeStorage]
  )

  return [updateCache, error]
}

export default useUpdateCache
