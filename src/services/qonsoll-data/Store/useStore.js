import { useContext } from 'react'
import StoreContext from './StoreContext'

const useStore = () => useContext(StoreContext)

export default useStore
