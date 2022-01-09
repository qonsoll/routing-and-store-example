import { useCallback } from 'react'
import { Form } from 'antd'
import { Button } from '@qonsoll/react-design'
import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useFindRecord, useModel } from 'services/qonsoll-data/Store'
import { useHistory } from 'react-router-dom'
import { useQForm } from './hooks'

const UserAdvancedForm = ({ id }) => {
  const history = useHistory()

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

  const [user, loading] = useFindRecord(query)
  const [, getAddressId] = useModel('address')
  const [, getUserId] = useModel('user')

  const currentAddressId = user?.address?.id || getAddressId()
  const currentUserId = id || getUserId()

  const [userForm] = Form.useForm()
  const [addressForm] = Form.useForm()
  const [interestForm] = Form.useForm()

  console.log('currentUserId', currentUserId)

  const { submit } = useQForm({
    parentId: currentUserId,
    id: currentUserId,
    actionType: id ? 'update' : 'create',
    modelName: 'user',
    relationshipModels: ['address', 'interest']
  })

  const submitSave = useCallback(() => {
    submit()
    history.push('/users')
  }, [history, submit])

  return (
    <>
      {id && loading ? (
        'Loading...'
      ) : (
        <>
          <UserSimpleForm
            title="General info"
            form={userForm}
            user={user}
            id={currentUserId}
          />
          <AddressSimpleForm
            title="Address"
            form={addressForm}
            address={user?.address}
            userId={currentUserId}
            id={currentAddressId}
          />
          <InterestsList
            userId={currentUserId}
            title="Interests"
            interests={user?.interests}
            form={interestForm}
          />
          <Button onClick={submitSave}>Save</Button>
        </>
      )}
    </>
  )
}

export default UserAdvancedForm
