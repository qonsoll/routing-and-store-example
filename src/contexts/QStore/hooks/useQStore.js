import { useContext } from 'react'
import QStoreContext from '../QStoreContext'

const useQStore = () => useContext(QStoreContext)

export default useQStore
