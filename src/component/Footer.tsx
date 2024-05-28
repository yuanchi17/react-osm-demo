import COLOR from '@/utils/theme-color'
import { Box, IconButton } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  const handlerIconClick = href => {
    navigate(href)
  }

  return (
    <Box
      sx={{
        backgroundColor: COLOR.disabled.light,
        position: 'fixed',
        bottom: 0,
        width: '-webkit-fill-available',
        zIndex: 9999,
      }}
      padding={'10px'}
    >
      <Box display={'flex'} justifyContent={'space-between'} sx={{ borderRadius: '50px', backgroundColor: 'white' }}>
        <IconButton aria-label='home' onClick={() => handlerIconClick('/')} sx={{ margin: 'auto' }}>
          <HomeIcon fontSize='large' sx={{ color: COLOR.primary.light }} />
        </IconButton>
        <IconButton aria-label='search' onClick={() => handlerIconClick('/Demo')} sx={{ margin: 'auto' }}>
          <SearchIcon fontSize='large' sx={{ color: COLOR.primary.light }} />
        </IconButton>
        <IconButton aria-label='favorite-border' onClick={() => handlerIconClick('/')} sx={{ margin: 'auto' }}>
          <FavoriteBorderIcon fontSize='large' sx={{ color: COLOR.primary.light }} />
        </IconButton>
        <IconButton aria-label='settings' onClick={() => handlerIconClick('/')} sx={{ margin: 'auto' }}>
          <SettingsIcon fontSize='large' sx={{ color: COLOR.primary.light }} />
        </IconButton>
      </Box>
    </Box>
  )
}
