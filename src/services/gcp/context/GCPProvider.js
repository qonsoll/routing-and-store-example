import { cloneElement } from 'react'
import GCPContext from './GCPContext'

const GCPProvider = ({ children, app }) => {
  return (
    <GCPContext.Provider value={{}}>
      <GCPContext.Consumer>
        {({ app }) => cloneElement(children, { app })}
      </GCPContext.Consumer>
    </GCPContext.Provider>
  )
}

export default GCPProvider
