import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useCreateRuntimeStorage } from 'services/qonsoll-data/RuntimeStorage'
import { divide } from 'lodash'

const UserAdvancedForm = ({ id }) => {
  const { store, document, storage } = useCreateRuntimeStorage({
    ordered: {},
    structured: {}
  })

  console.log('new store ->>', store)

  const doc = document('structured', 'users', 'myId')
  const st = storage()

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
      <button onClick={() => st.create('test.someCollection.value')}>
        Try create storage
      </button>
      <button onClick={() => st.remove('test.someCollection')}>
        Try remove storage
      </button>
      <button onClick={() => st.update('test', 15)}>Try update storage</button>
      <button onClick={() => st.get('test')}>Try get storage</button>

      <UserSimpleForm title="General info" />
      <AddressSimpleForm title="Address" />
      <InterestsList title="Interests" />
    </>
  )
}

export default UserAdvancedForm
