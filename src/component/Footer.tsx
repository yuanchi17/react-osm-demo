import { Box, IconButton } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'

export default function Footer() {
  return (
    <Box
      sx={{ backgroundColor: 'lightgray', position: 'fixed', bottom: 0, width: '-webkit-fill-available', zIndex: 9999 }}
      padding={'10px'}
    >
      <Box display={'flex'} justifyContent={'space-between'} sx={{ borderRadius: '50px', backgroundColor: 'white' }}>
        <IconButton aria-label='home' color='primary' sx={{ margin: 'auto' }}>
          <HomeIcon fontSize='large' color='disabled' />
        </IconButton>

        <IconButton aria-label='search' color='primary' sx={{ margin: 'auto' }}>
          <SearchIcon fontSize='large' color='disabled' />
        </IconButton>
        <IconButton aria-label='favorite-border' color='primary' sx={{ margin: 'auto' }}>
          <FavoriteBorderIcon fontSize='large' color='disabled' />
        </IconButton>
        <IconButton aria-label='settings' color='primary' sx={{ margin: 'auto' }}>
          <SettingsIcon fontSize='large' color='disabled' />
        </IconButton>
      </Box>
    </Box>
  )
}
