import { useParams } from 'react-router-dom'
import { UserSimpleForm } from 'domains/User/components'

const Edit = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Edit user</h1>
      <UserSimpleForm id={id} />
    </div>
  )
}

export default Edit
