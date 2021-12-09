import StoreContext from './StoreContext'
import PropTypes from 'prop-types'

const StoreProvider = ({
  children,
  runtimeStorage,
  defaultAdapter,
  models
}) => {
  return (
    <StoreContext.Provider value={{ runtimeStorage, defaultAdapter, models }}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
  // runtimeStorage: PropTypes.object.isRequired,
  defaultAdapter: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired
}

export default StoreProvider
