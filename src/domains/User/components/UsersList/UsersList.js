import { useStore } from '../../../../contexts/Store'
import { useOnComponentDidMount } from 'hooks'
import UserSimpleView from '../UserSimpleView'

const UsersList = () => {
  const { store, fetchRecords, filterRecords } = useStore()

  useOnComponentDidMount(() => {
    fetchRecords({ collectionPath: 'users' })
  })

  return (
    <div>
      <div>
        {store?.ordered?.users?.map((user) => {
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
