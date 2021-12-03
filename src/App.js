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
import { createLocalStorage } from './services/qonsoll-data/LocalStorage'
import { StoreProvider } from './services/qonsoll-data/Store'
import { createFirestoreAdapter } from './services/qonsoll-data/Adapters'
import { construct } from 'services/qonsoll-data/Store/methods'

const tmpDB = JSON.parse(
  '{"users":{"7WB6kbZSPbrzuJJlmOwQ":{"firstName":"Yevhen","lastName":"Bogdanov1","id":"7WB6kbZSPbrzuJJlmOwQ","birthDate":null,"age":"30","public":true,"interests":["interest1","interest2","interest3"],"address":"address1"}},"addresses":{"address1":{"country":"country1","city":"city1","id":"address1"}},"cities":{"city1":{"id":"city1","name":"Khmelnitskiy"}},"countries":{"country1":{"id":"country1","name":"Ukraine"}},"interests":{"interest1":{"id":"interest1","name":"JS"},"interest2":{"id":"interest2","name":"MongoDB"},"interest3":{"name":"NodeJS","id":"interest3"}}}'
)

const runtimeStorage = createRuntimeStorage(tmpDB)
const localStorage = createLocalStorage('test')

const tmpQuery = `query {
  users {
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
  construct(tmpQuery, models, localStorage).then((res) => console.log(res))
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
