import { AppContextProvider } from './context/app-context'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AllRoutes />
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
