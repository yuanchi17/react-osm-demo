import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/app-context'
import AllRoutes from './routes'
import COLOR from './utils/theme-color'

import '@/assets/css/f2e-style.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: COLOR,
})

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <AllRoutes />
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
