import SessionContext from './SessionContext'
import { useContext } from 'react'

const useSession = () => useContext(SessionContext)

export default useSession
