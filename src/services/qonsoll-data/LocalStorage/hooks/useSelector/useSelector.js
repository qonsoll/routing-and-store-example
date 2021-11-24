import { useState, useEffect } from 'react'
import useLocalStorage from '../useLocalStorage'

/**
 * Get specific data from the store provided to the context
 * @constructor
 * @param {string} selector - path to the document
 */
const useSelector = (selector) => {
  // Get current state of the storage
  const { storage } = useLocalStorage()
  // Setup local state of the hook
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    // Validating data
    const isValid = storage && selector
    try {
      if (!isValid)
        throw new Error('Data provided to the useSelector hook is not correct')
    } catch (err) {
      console.error(err)
    }

    // Updating local state
    isValid && setSelectedData(storage.get(selector))

    return () => {}
  }, [storage, selector])

  return selectedData
}

export default useSelector
