import Header from '@/component/Header'
import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

// import Footer from '@/component/Footer'

export default function Layout() {
  return (
    <Box display={'flex'} flexDirection={'column'} overflow={'auto'} sx={{ height: '100vh' }}>
      <Header />
      <Toolbar />
      <Outlet />
      {/* <Footer /> */}
    </Box>
  )
}
