import '@qonsoll/react-design/dist/styles/styles.css'
import '@qonsoll/react-design/dist/styles/vars/index.css'
import './styles.css'
import Navigator from './pages/Navigator'
import { SessionProvider } from './contexts/Session'
import { StoreProvider } from './contexts/Store'

export default function App() {
  return (
    <div className="App">
      <SessionProvider>
        <StoreProvider>
          <Navigator />
        </StoreProvider>
      </SessionProvider>
    </div>
  )
}
