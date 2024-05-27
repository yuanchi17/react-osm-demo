import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/app-context'
import AllRoutes from './routes'

import '@/assets/css/f2e-style.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

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
