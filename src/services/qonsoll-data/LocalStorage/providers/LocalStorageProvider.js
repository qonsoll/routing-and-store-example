import { LocalStorageContext } from '../contexts'
import PropTypes from 'prop-types'

const LocalStorageProvider = ({ children, storage }) => (
  <LocalStorageContext.Provider value={{ storage }}>
    {children}
  </LocalStorageContext.Provider>
)

LocalStorageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  storage: PropTypes.object.isRequired
}

export default LocalStorageProvider
