import UsersList from '../../../../domains/User/components/UsersList'
import { useUserActions } from '../../../../domains/User/hooks'

const Users = () => {
  const { redirectToCreate, destroyDirtyUsers } = useUserActions()

  return (
    <div>
      <h1>
        Users all <button onClick={redirectToCreate}>Create</button>{' '}
        <button onClick={destroyDirtyUsers}>Clean dirty</button>
      </h1>
      <UsersList />
    </div>
  )
}

export default Users
