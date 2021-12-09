import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useFindRecord } from 'services/qonsoll-data/Store'

const UserAdvancedForm = ({ id }) => {
  const query = `query {
    users(id: "${id}") {
      firstName,
      lastName,
      birthDate,
      address {
        id,
        city {
          id,
          name
        }
        country {
          id,
          name
        }
      },
      interests {
        id,
        name
      }
    }
}`
  const [user, loading, error] = useFindRecord(query)

  return (
    <>
      {id && loading ? (
        'Loading...'
      ) : (
        <>
          <UserSimpleForm title="General info" user={user} />
          <AddressSimpleForm title="Address" address={user?.address} />
          <InterestsList title="Interests" interests={user?.interests} />
        </>
      )}
    </>
  )
}

export default UserAdvancedForm
