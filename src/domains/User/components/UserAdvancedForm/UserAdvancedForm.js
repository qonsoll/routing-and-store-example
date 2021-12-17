import { useCallback } from 'react'
import { Form } from 'antd'
import { Button } from '@qonsoll/react-design'
import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useFindRecord, useModel, useStore } from 'services/qonsoll-data/Store'
import { useHistory } from 'react-router-dom'
import { useCreateRecord, useUpdateRecord } from './hooks'

const UserAdvancedForm = ({ id }) => {
  const history = useHistory()

  const createRecord = useCreateRecord()
  const updateRecord = useUpdateRecord()

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
  const [, getUserId] = useModel('user')
  const [, getAddressId] = useModel('address')

  const currentUserId = id || getUserId()
  const currentAddressId = user?.address?.id || getAddressId()

  const [userForm] = Form.useForm()
  const [addressForm] = Form.useForm()

  const { runtimeStorage } = useStore()

  const submitSave = useCallback(() => {
    const action = id
      ? () => updateRecord(currentUserId, currentAddressId)
      : () => createRecord(currentUserId, currentAddressId)
    action()
    runtimeStorage.remove('unsaved')
    history.push('/users')

    console.log(runtimeStorage)
  }, [
    createRecord,
    currentAddressId,
    currentUserId,
    history,
    id,
    runtimeStorage,
    updateRecord
  ])

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
            id={currentAddressId}
          />
          <InterestsList
            userId={currentUserId}
            title="Interests"
            interests={user?.interests}
          />
          <Button onClick={submitSave}>Save</Button>
        </>
      )}
    </>
  )
}

export default UserAdvancedForm
