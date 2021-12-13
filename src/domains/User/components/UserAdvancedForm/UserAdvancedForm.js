// import { useCallback } from 'react'
import { Form } from 'antd'
// import { Button } from '@qonsoll/react-design'
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
  const [user, loading] = useFindRecord(query)

  const [userForm] = Form.useForm()
  const [addressForm] = Form.useForm()

  // const submit = useCallback(() => {
  //   const user = userForm.getFieldsValue()
  //   const address = addressForm.getFieldsValue()
  //   console.log('form data ->', user, address)
  // }, [userForm, addressForm])

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
            id={id}
          />
          <AddressSimpleForm
            title="Address"
            form={addressForm}
            address={user?.address}
          />
          <InterestsList title="Interests" interests={user?.interests} />
          {/* <Button onClick={submit}>Save</Button> */}
        </>
      )}
    </>
  )
}

export default UserAdvancedForm
