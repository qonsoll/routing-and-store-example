import { useHistory } from 'react-router-dom'
import * as models from 'models'
import PATHS from 'pages/paths'
import { useStore } from '../../../contexts/Store'

const { user } = models

const useUserActions = (id) => {
  const history = useHistory()
  const {
    removeRecord,
    destroyRecord,
    destroyDirty,
    updateRecord,
    saveRecord
  } = useStore()

  const collectionPath = user.collectionPath
  const userId = id || user.newId
  const userData = { collectionPath, id: userId }

  const remove = () => removeRecord(userData)
  const destroy = () => destroyRecord(userData)
  const destroyDirtyUsers = () => destroyDirty({ collectionPath })
  const save = () => (id ? updateRecord(userData) : saveRecord(userData))

  // Redirects
  const redirectToCreate = () => history.push(PATHS.AUTHENTICATED.USER_CREATE)
  const redirectToEdit = () => history.push(`users/${id}/edit`)
  const redirectToAll = () => history.push(PATHS.AUTHENTICATED.USERS_ALL)

  return {
    redirectToEdit,
    redirectToCreate,
    remove,
    redirectToAll,
    destroy,
    destroyDirtyUsers,
    save
  }
}

export default useUserActions
