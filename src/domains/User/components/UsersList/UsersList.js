import UserSimpleView from '../UserSimpleView'
import { useFindAll, useFindRecord } from 'services/qonsoll-data/Store'

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

const peekQuery = `query {
    users(id: "7WB6kbZSPbrzuJJlmOwQ") {
      firstName,
      lastName,
      age
    }
}`

const UsersList = () => {
  const [data, loading] = useFindAll(query)
  const [document] = useFindRecord(peekQuery)
  // const [documents] = usePeekAll(query)
  console.log('🚀 ~ file: UsersList.js ~ line 29 ~ UsersList ~ data', data)
  console.log('result document ---> ', document)

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
