import { useContext } from 'react'
import { RuntimeStorageContext } from '../../contexts'

// Get current storage (from Provider)
const useRuntimeStorage = () => useContext(RuntimeStorageContext)

export default useRuntimeStorage
