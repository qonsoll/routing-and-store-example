import { useHistory } from 'react-router-dom'
import PATHS from 'pages/paths'
import { useStore } from '../../../contexts/Store'

const useUserActions = () => {
  const history = useHistory()
  const { createRecord, removeRecord, destroyRecord, destroyDirty } = useStore()

  const create = (payload) => createRecord('user', payload)
  const redirectToCreate = () => history.push(PATHS.AUTHENTICATED.USER_CREATE)
  const redirectToEdit = (id) => history.push(`users/${id}/edit`)
  const remove = (id) => removeRecord({ collectionPath: 'users', id })
  const destroy = (id) => destroyRecord({ collectionPath: 'users', id })
  const destroyDirtyUsers = () => destroyDirty({ collectionPath: 'users' })

  return {
    create,
    redirectToEdit,
    redirectToCreate,
    remove,
    destroy,
    destroyDirtyUsers
  }
}

export default useUserActions
