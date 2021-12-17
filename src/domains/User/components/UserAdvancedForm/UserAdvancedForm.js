import { useCallback } from 'react'
import { Form } from 'antd'
import { Button } from '@qonsoll/react-design'
import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import {
  useFindRecord,
  useMutations,
  useModel,
  useStore
} from 'services/qonsoll-data/Store'
import moment from 'moment'
import _ from 'lodash'

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

  const [user, loading] = useFindRecord(query)
  const [userModel, getUserId] = useModel('user')
  const [addressModel, getAddressId] = useModel('address')

  const currentUserId = id || getUserId()
  const currentAddressId = user?.address?.id || getAddressId()

  const [userForm] = Form.useForm()
  const [addressForm] = Form.useForm()

  const { add, update } = useMutations()
  const { runtimeStorage } = useStore()

  const createRecord = useCallback(() => {
    let userData = runtimeStorage.get(`unsaved.users.${currentUserId}`)
    userData.address = currentAddressId
    userData.birthDate = moment(userData.birthDate).format('YYYY-MM-DD') || null

    userData = _.merge(userModel.defaultValues, userData)

    let addressData = runtimeStorage.get(
      `unsaved.addresses.${currentAddressId}`
    )
    const interestsData = runtimeStorage.get(`unsaved.interests`)
    console.log(interestsData)

    userData && addressData && add('user', currentUserId, userData)
    userData && addressData && add('address', currentAddressId, addressData)
    interestsData &&
      Object.entries(interestsData).forEach(
        (interest) => interest && add('interest', interest?.id, interest)
      )

    console.log(runtimeStorage)
  }, [
    add,
    currentAddressId,
    currentUserId,
    runtimeStorage,
    userModel?.defaultValues
  ])

  const updateRecord = useCallback(() => {
    const userData = runtimeStorage.get(`unsaved.users.${currentUserId}`)
    userData.address = currentAddressId
    const addressData = runtimeStorage.get(
      `unsaved.addresses.${currentAddressId}`
    )
    userData.birthDate = moment(userData.birthDate).format('YYYY-MM-DD')

    const interestsData = runtimeStorage.get(`unsaved.interests`)
    console.log('interestsData --->', interestsData)

    interestsData &&
      Object.entries(interestsData).forEach((interestItem) => {
        const [id, interest] = interestItem
        interest && add('interest', id, interest)
      })

    userData && update('user', currentUserId, userData)
    addressData && update('address', currentAddressId, addressData)
    console.log(runtimeStorage)
  }, [add, currentAddressId, currentUserId, runtimeStorage, update])

  const submitSave = useCallback(() => {
    const action = id ? updateRecord : createRecord
    action()
    runtimeStorage.remove('unsaved')

    console.log(runtimeStorage)
  }, [createRecord, id, runtimeStorage, updateRecord])

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
