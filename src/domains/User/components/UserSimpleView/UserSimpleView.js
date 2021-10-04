import { useUserActions } from '../../hooks'

const UserSimpleView = ({ id, firstName, lastName, age }) => {
  const { remove, redirectToEdit } = useUserActions()
  return (
    <div>
      {id} | {firstName} {lastName} | {age}
      <button onClick={() => redirectToEdit(id)}>Edit</button>
      <button onClick={() => remove(id)}>Delete</button>
    </div>
  )
}

export default UserSimpleView
