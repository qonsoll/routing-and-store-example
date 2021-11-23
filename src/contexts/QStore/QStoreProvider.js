import { cloneElement } from 'react'
import QStoreContext from './QStoreContext'

const QStoreProvider = ({ children, stores }) => {
  return (
    <QStoreContext.Provider value={{ stores }}>
      <QStoreContext.Consumer>
        {({ stores }) => cloneElement(children, { stores })}
      </QStoreContext.Consumer>
    </QStoreContext.Provider>
  )
}

export default QStoreProvider
