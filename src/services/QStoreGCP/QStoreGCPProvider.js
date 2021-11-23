import QStoreGCPContext from './QStoreGCPContext'

const QStoreGCPProvider = ({ children }) => {
  return (
    <QStoreGCPContext.Provider value={{}}>{children}</QStoreGCPContext.Provider>
  )
}

export default QStoreGCPProvider
