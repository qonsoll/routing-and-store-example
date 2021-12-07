import UserSimpleView from '../UserSimpleView'
import { useFindAll } from 'services/qonsoll-data/Store'

const query = `query {
    users {
      firstName,
      lastName,
      age,
      address {
        city,
        country
      },
      interests {
        name
      }
    }
}`

// const query = `query {
//     users {
//       firstName,
//       lastName,
//       age
//     }
// }`

const UsersList = () => {
  const [data, loading] = useFindAll(query)
  // const [documents] = usePeekAll(query)
  console.log('🚀 ~ file: UsersList.js ~ line 29 ~ UsersList ~ data', data)

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      {data?.users?.map((user) => {
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
