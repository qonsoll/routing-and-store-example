import { useHistory } from 'react-router-dom'
import PATHS from 'pages/paths'
import { useStore } from '../../../contexts/Store'

const useUserActions = () => {
  const history = useHistory()
  const {
    createRecord,
    removeRecord,
    destroyRecord,
    destroyDirty,
    fetchRecord
  } = useStore()

  const create = (payload) => createRecord('user', payload)
  const redirectToCreate = () => history.push(PATHS.AUTHENTICATED.USER_CREATE)
  const redirectToEdit = (id) => history.push(`users/${id}/edit`)
  const remove = (id) => removeRecord({ collectionPath: 'users', id })
  const destroy = (id) => destroyRecord({ collectionPath: 'users', id })
  const destroyDirtyUsers = () => destroyDirty({ collectionPath: 'users' })
  const update = (id) => fetchRecord({ collectionPath: 'users', id })

  return {
    create,
    redirectToEdit,
    redirectToCreate,
    remove,
    destroy,
    destroyDirtyUsers,
    update
  }
}

export default useUserActions
