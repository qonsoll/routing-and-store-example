import { useContext } from 'react'
import GCPContext from './GCPContext'

const useGCP = () => useContext(GCPContext)

export default useGCP
