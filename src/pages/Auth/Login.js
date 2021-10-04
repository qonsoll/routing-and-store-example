import { Link } from 'react-router-dom'
import { useSession } from '../../contexts/Session'

const Login = () => {
  const { login } = useSession()
  return (
    <div>
      <h1>Login</h1>
      <div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        Don't have account? <Link to="/auth/signup">Signup</Link>
      </div>
      <div>
        <Link to="/auth/forgot-password">Forgot password?</Link>
      </div>
    </div>
  )
}

export default Login
