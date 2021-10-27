import { useUserActions } from '../../hooks'

const UserSimpleView = ({ id, firstName, lastName, age }) => {
  const { remove, redirectToEdit, destroy, update } = useUserActions()
  return (
    <div>
      {id} | {firstName} {lastName} | {age}
      <button onClick={() => redirectToEdit(id)}>Edit</button>
      <button onClick={() => remove(id)}>Delete</button>
      <button onClick={() => destroy(id)}>Destroy</button>
      <button onClick={() => update(id)}>Update</button>
    </div>
  )
}

export default UserSimpleView
