import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'

import LoopIcon from '@mui/icons-material/Loop'

export default function Header() {
  return (
    <Box display={'flex'}>
      <AppBar component={'nav'}>
        <Toolbar>
          <Typography variant='h6' component='div' marginY={'15px'} sx={{ flexGrow: 1 }}>
            React OSM Demo
          </Typography>

          <IconButton aria-label='reload' sx={{ margin: 'auto' }}>
            <LoopIcon fontSize='medium' sx={{ color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
