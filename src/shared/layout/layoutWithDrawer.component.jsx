import { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { routerModel } from '../../model'
import { NavbarComponent } from '../components/navbar.component'
import logo from '../../assets/logo.png'
import { Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const drawerWidth = 240

export const LayoutWithDrawerComponent = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const handleToggleClick = () => {
    setOpen(!open)
  }
  const auth = true // sessionStorage.getItem('token')
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <>
      <Toolbar
        sx={{
          py: 2.2,
          background: 'rgba(255, 117, 40, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <img width={100} height={40} className="darop" src={logo} alt="logo" />
      </Toolbar>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        height="100vh"
      >
        <List sx={{ pl: 0.3 }}>
          <ListItem disablePadding>
            <NavLink to="/" className="w-full">
              <ListItemButton>
                <ListItemText sx={{ width: 200 }} primary="Главная" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to="/addnewinsuransecompany" className="w-full">
              <ListItemButton>
                <ListItemText
                  sx={{ width: 200 }}
                  primary="Отправить в Epolic"
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItemButton
            sx={{
              background: '#a3bbde',
              mr: 0.5,
              ':hover': { bgcolor: '#FF7528' },
            }}
            onClick={handleToggleClick}
          >
            <ListItemText primary="Продукты" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {routerModel.map(({ name, path }) => (
              <ListItem key={name} disablePadding>
                <NavLink to={path} className="w-full">
                  <ListItemButton>
                    <ListItemText sx={{ width: 200 }} primary={name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </Collapse>
        </List>
        <List sx={{ pl: 0.5 }}>
          <ListItem disablePadding>
            <NavLink to={'/login'}>
              <ListItemButton>
                <ListItemText sx={{ width: 200 }} primary="Выход" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return auth ? (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavbarComponent onMenuClick={handleDrawerToggle} />
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: '#FF7528',
                color: '#000',
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                //background: '#FF7528',
                color: '#000',
              },
              background: '#FF7528',
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}
