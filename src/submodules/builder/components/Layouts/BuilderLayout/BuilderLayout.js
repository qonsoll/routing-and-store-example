import { useHistory } from 'react-router-dom'

const BuilderLayout = ({ children }) => {
  const history = useHistory()

  const back = () => history.goBack()

  return (
    <div>
      <div>
        <button onClick={back} style={{ marginRight: '16px' }}>
          {`<- Go back`}
        </button>
        Builder layout
      </div>
      <div>{children}</div>
    </div>
  )
}

export default BuilderLayout
