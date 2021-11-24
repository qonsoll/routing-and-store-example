import UserSimpleForm from '../UserSimpleForm'
import { AddressSimpleForm } from 'domains/Address/components'
import { InterestsList } from 'domains/Interest/components'

const UserAdvancedForm = ({ id }) => {
  return (
    <>
      <UserSimpleForm title="General info" />
      <AddressSimpleForm title="Address" />
      <InterestsList title="Interests" />
    </>
  )
}

export default UserAdvancedForm
