import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      Already have account? <Link to="/auth">Login</Link>
    </div>
  )
}

export default Signup
