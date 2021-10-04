import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div>
      <h1>Forgot password</h1>
      <Link to="/auth">Login</Link>
    </div>
  )
}

export default ForgotPassword
