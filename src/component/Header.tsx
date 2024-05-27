import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const handlerNavClick = href => {
    navigate(href)
  }
  return (
    <Box display={'flex'}>
      <AppBar component={'nav'}>
        <Toolbar>
          <Typography variant='h6' component='div' marginY={'15px'} sx={{ flexGrow: 1 }}>
            React OSM Demo
          </Typography>

          <Box sx={{}}>
            <Button onClick={() => handlerNavClick('/')} sx={{ color: '#fff' }}>
              Home
            </Button>
            <Button onClick={() => handlerNavClick('/Demo')} sx={{ color: '#fff' }}>
              Demo
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
