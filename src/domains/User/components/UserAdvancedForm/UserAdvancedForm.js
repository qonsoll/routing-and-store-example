import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'
import { useCreateQStore, QStoreProvider, useQStore } from 'contexts/QStore'
import { divide } from 'lodash'

const UserAdvancedForm = ({ id }) => {
  const { store, document } = useCreateQStore({
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
