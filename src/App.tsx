import { BrowserRouter, NavLink } from 'react-router-dom'
import { AppContextProvider } from './context/app-context'
import AllRoutes from './routes'

import '@/assets/css/f2e-style.css'

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <div>React OSM Demo</div>
        <nav className='nav'>
          <ul className='nav-list'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/Demo'>Demo</NavLink>
            </li>
          </ul>
        </nav>
        <AllRoutes />
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
