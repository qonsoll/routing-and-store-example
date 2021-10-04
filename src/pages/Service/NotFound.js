import { Link } from 'react-router-dom'
import PATHS from '../paths'

const { DEFAULT } = PATHS.CONFIG

const NotFound = () => {
  return (
    <div>
      <h1>Not found</h1>
      <Link to={DEFAULT}>Go to main page</Link>
    </div>
  )
}

export default NotFound
