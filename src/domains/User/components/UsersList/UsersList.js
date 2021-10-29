import { useStore } from '../../../../contexts/Store'
import { useOnComponentDidMount } from 'hooks'
import UserSimpleView from '../UserSimpleView'
import Sidebar from 'submodules/builder/components/Sidebar/Sidebar'

const UsersList = () => {
  const { store, fetchRecords } = useStore()

  useOnComponentDidMount(() => {
    fetchRecords({ collectionPath: 'users' })
  })

  const showUsers = () => {
    if (store.filtered) return 'filtered'
    else if (store.filtered?.users?.length === 0) return 'ordered'
    else return 'ordered'
  }

  const type = showUsers()

  console.log()

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar store={store} collectionPath="users"></Sidebar>.
      <div style={{ marginLeft: '400px' }}>
        {store?.[type]?.users?.map((user) => {
          const { id, firstName, lastName, age } = user
          return (
            <UserSimpleView
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
              age={age}
            />
          )
        })}
      </div>
    </div>
  )
}

export default UsersList
