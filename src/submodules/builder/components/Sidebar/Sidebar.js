import { useStore } from '../../../../contexts/Store'
import { useState } from 'react'

const Sidebar = ({ store, collectionPath }) => {
  const { filterRecords } = useStore()
  const [maxAge, setMaxAge] = useState()
  const [minAge, setMinAge] = useState()

  const onChangeMaxAge = (event) => setMaxAge(event.target.value)
  const onChangeMinAge = (event) => setMinAge(event.target.value)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
    >
      <label>Max age</label>
      <input type="text" onChange={onChangeMaxAge} />
      <label>Min age</label>
      <input type="text" onChange={onChangeMinAge} />
      <label>
        Active
        <input type="checkbox" />
      </label>
      <label>
        Pending
        <input type="checkbox" />
      </label>
      <button
        onClick={() => {
          filterRecords(collectionPath, {
            age: {
              '>=': 20,
              '<': 90
            },
            'firstName.length': {
              '>': 0,
              '<': 10
            }
          })
        }}
      >
        Show state
      </button>
      <button>Clear filter</button>
    </div>
  )
}

export default Sidebar
