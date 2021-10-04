import { useState, useEffect } from 'react'

const useOnComponentDidMount = (method) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    !initialized && method()
    setInitialized(true)
  }, [initialized, method])
}

export default useOnComponentDidMount
