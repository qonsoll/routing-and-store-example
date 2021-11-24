import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts'

const useLocalStorage = () => useContext(LocalStorageContext)

export default useLocalStorage
