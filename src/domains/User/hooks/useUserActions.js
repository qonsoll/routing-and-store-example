import { useHistory } from 'react-router-dom'
import PATHS from 'pages/paths'
import { useStore } from '../../../contexts/Store'

const useUserActions = () => {
  const history = useHistory()
  const { createRecord, destroyRecord } = useStore()

  const create = (payload) => createRecord('user', payload)
  const redirectToCreate = () => history.push(PATHS.AUTHENTICATED.USER_CREATE)
  const redirectToEdit = (id) => history.push(`users/${id}/edit`)
  const remove = (id) => destroyRecord('user', id)

  return {
    create,
    redirectToEdit,
    redirectToCreate,
    remove
  }
}

export default useUserActions
