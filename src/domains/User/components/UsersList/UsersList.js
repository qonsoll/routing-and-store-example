import UserSimpleView from '../UserSimpleView'
import { useFindAll, usePeekAll } from 'services/qonsoll-data/Store'

const query = `query {
    users {
      firstName,
      lastName,
      address {
        city,
        country
      },
      interests
    }
}`

const UsersList = () => {
  const [users, loading, error] = useFindAll(query)
  const peekAll = usePeekAll()

  const documents = peekAll(query)
  console.log(documents)

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      {users &&
        users.map((user) => {
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
  )
}

export default UsersList
