import { cloneElement } from 'react'
import { RuntimeStorageContext } from '../contexts'
import PropTypes from 'prop-types'

const RuntimeStorageProvider = ({ children, storage }) => (
  <RuntimeStorageContext.Provider value={{ storage }}>
    <RuntimeStorageContext.Consumer>
      {({ storage }) => cloneElement(children, { runtimeStorage: storage })}
    </RuntimeStorageContext.Consumer>
  </RuntimeStorageContext.Provider>
)

RuntimeStorageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  storage: PropTypes.object.isRequired
}

export default RuntimeStorageProvider
