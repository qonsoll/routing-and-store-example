import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useCreateRuntimeStorage } from 'services/qonsoll-data/RuntimeStorage'
import { divide } from 'lodash'

const UserAdvancedForm = ({ id }) => {
  const { store, document } = useCreateRuntimeStorage({
    ordered: {},
    structured: {}
  })

  console.log('new store ->>', store)

  const doc = document('structured', 'users', 'myId')
  return (
    <>
      <button onClick={() => doc.set({ name: 'Oleksiy', interests: [] })}>
        Add document
      </button>
      <button onClick={() => doc.update('name', 'Yevhen')}>
        Update document
      </button>
      <button onClick={() => doc.push('interests', 'reading')}>
        Add interest
      </button>
      <button onClick={() => doc.remove()}>Remove</button>
      <UserSimpleForm title="General info" />
      <AddressSimpleForm title="Address" />
      <InterestsList title="Interests" />
    </>
  )
}

export default UserAdvancedForm
