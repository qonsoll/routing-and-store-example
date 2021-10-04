import StoreContext from './StoreContext'
import { useContext } from 'react'

const useStore = () => useContext(StoreContext)

export default useStore
