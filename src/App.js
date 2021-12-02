import '@qonsoll/react-design/dist/styles/styles.css'
import '@qonsoll/react-design/dist/styles/vars/index.css'
import './styles.css'
import Navigator from './pages/Navigator'

import { SessionProvider } from './contexts/Session'
// import { StoreProvider } from './contexts/Store'
import { app } from './services/firebase'
import * as models from 'models'
import {
  createRuntimeStorage,
  RuntimeStorageProvider
} from './services/qonsoll-data/RuntimeStorage'
import { StoreProvider } from './services/qonsoll-data/Store'
import { createFirestoreAdapter } from './services/qonsoll-data/Adapters'
import { construct } from 'services/qonsoll-data/Store/methods'

const runtimeStorage = createRuntimeStorage({
  structured: {},
  ordered: {}
})

const tmpQuery = `query {
  users {
    firstName,
    lastName,
    age,
    address {
      city,
      country
    },
    interests
  }
}`

export default function App() {
  const adapter = createFirestoreAdapter(app)
  construct(tmpQuery, models).then((res) => console.log(res))
  return (
    <div className="App">
      <SessionProvider>
        <RuntimeStorageProvider storage={runtimeStorage}>
          <StoreProvider defaultAdapter={adapter} models={models}>
            <Navigator />
          </StoreProvider>
        </RuntimeStorageProvider>
      </SessionProvider>
    </div>
  )
}
