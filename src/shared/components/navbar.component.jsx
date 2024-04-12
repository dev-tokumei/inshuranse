import React, { useState } from 'react'
import { AppBar, Avatar, Box, IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../app/store/api/auth.api'
import MenuIcon from '@mui/icons-material/Menu'

export const NavbarComponent = ({ onMenuClick }) => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [logOut] = useLogoutMutation()

  const handleLogOut = async () => {
    try {
      await logOut({}).unwrap
      sessionStorage.clear()
      navigate('/login', { state: { from: location } })
    } catch (e) {}
  }
  return (
    <AppBar
      sx={{
        p: 2,
        background: 'rgba(255, 117, 40, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
      color="primary"
      position="fixed"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton onClick={onMenuClick}>
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Avatar
          sx={{ cursor: 'pointer' }}
          onClick={() => setShow(!show)}
          alt="Tokumei"
          src="https://tokumeidev.vercel.app/static/media/userImg.cccf5a5a2ab3c809fc49.jpg"
        ></Avatar>
        {show && (
          <Box
            position="absolute"
            top={80}
            right={20}
            px={2}
            py={2}
            sx={{ background: '#FF7528', color: '#f2f2f2', borderRadius: 3 }}
          >
            <Typography sx={{ cursor: 'pointer' }} onClick={handleLogOut}>
              Выход
            </Typography>
          </Box>
        )}
      </Box>
    </AppBar>
  )
}
