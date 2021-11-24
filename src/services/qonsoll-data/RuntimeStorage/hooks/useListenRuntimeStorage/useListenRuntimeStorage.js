import { useState, useEffect } from 'react'
import useRuntimeStorage from '../useRuntimeStorage'

/**
 * Subscribe to the Runtime Storage updates
 * @param {string} path - The title of the book
 */
const useListenRuntimeStorage = (path) => {
  // Get storage current state
  const { storage } = useRuntimeStorage()
  // Local state
  const [runtimeStorage, setRuntimeStorage] = useState(storage?.state)

  useEffect(() => {
    // Subscribing to the storage updates
    storage.subscribe((updatedPath, newState) => {
      // Validating path that user subscribed to
      const isPathMatches =
        path && (path === updatedPath || updatedPath.includes(path))

      let newRuntimeStorageState = isPathMatches ? storage.get(path) : newState
      if (Array.isArray(newRuntimeStorageState)) {
        newRuntimeStorageState = [...newRuntimeStorageState]
      } else if (typeof newRuntimeStorageState === 'object') {
        newRuntimeStorageState = { ...newRuntimeStorageState }
      }

      // Updating local storage with new values
      setRuntimeStorage(newRuntimeStorageState)
    })

    return () => {
      storage.unsubscribe()
    }
  }, [path, storage])

  return runtimeStorage
}

export default useListenRuntimeStorage
