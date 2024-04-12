import React from 'react'
import { NavLink, useRouteError } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
export const ErrorComponent = () => {
  const error = useRouteError()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      id="error-page"
      height={'100vh'}
    >
      <Box textAlign="center">
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h6">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>
          <i>{error.statusText || error.message}</i>
        </Typography>
        <NavLink to={'/'}>Вернут на главная страница</NavLink>
      </Box>
    </Box>
  )
}
