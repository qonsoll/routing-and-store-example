import UserSimpleView from '../UserSimpleView'
import {
  useFindAll,
  useFindRecord
  // useQuery,
  // useFetchAll,
  // useFetchRecord
} from 'services/qonsoll-data/Store'

const query = `query {
    users {
      id,
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

const recordQuery = `query {
    users(id: "7WB6kbZSPbrzuJJlmOwQ") {
      id,
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

// const conditionals = [['age', '==', '30']]

const UsersList = () => {
  // const [users, loading] = useFindAll(query, {
  // fetchInterval: 120,
  // forceIntervalRefresh: true,
  // construct: true
  // })

  const [users, loading] = useFindAll(query)
  console.log('🚀 ~ file: UsersList.js( ~ line 51 ~ UsersList ~ users', users)
  const [user] = useFindRecord(recordQuery)
  console.log('user from findRecord', user)

  // const [document] = useFetchRecord(recordQuery)
  // const [document] = useFindRecord(peekQuery, {
  //   fetchInterval: 120,
  //   forceIntervalRefresh: true,
  //   construct: true
  // })
  // const [documents] = useQuery(
  //   query,
  //   {
  //     construct: true
  //   },
  //   conditionals
  // )
  // console.log(documents)
  // const [documents] = usePeekAll(query)
  // console.log('🚀 ~ file: UsersList.js ~ line 29 ~ UsersList ~ data', data)
  // console.log('result document ---> ', document)

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      {users?.map((user) => {
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
