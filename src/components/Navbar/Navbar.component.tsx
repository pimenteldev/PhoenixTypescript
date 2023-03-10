import {APP_NAME} from '@/constants'
import {AppBar, Avatar, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {Logout} from '../Logout'
import {sidebarOpenSubject$} from '../Sidebar/Sidebar.component'
import {Menu} from './styled-component'
import logo from '/icon.png'

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const handleClick = () => {
    sidebarOpenSubject$.setSubject = true
  }
  return (
    <AppBar
      position="fixed"
      color="primary"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="Menu"
          sx={{
            mr: {xs: 0, sm: 1},
          }}
          onClick={handleClick}
        >
          <Menu />
        </IconButton>
        <Avatar
          src={logo}
          sx={{
            height: 30,
            width: 30,
            display: {xs: 'none', sm: 'block'},
            mr: 1,
            borderRadius: 0,
          }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{flexGrow: 1, fontWeight: 900}}
        >
          {APP_NAME}
        </Typography>

        <Logout />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
