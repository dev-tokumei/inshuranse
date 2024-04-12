import React, { useState } from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import logo from '../assets/logo.png'
import Button from '@mui/material/Button'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'
import { useLoginMutation } from '../app/store/api/auth.api'
import { useLocation, useNavigate } from 'react-router-dom'

export const LoginComponent = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [login, { isLoading, isError }] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(isError)
  const handleValidation = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!userData.username) {
      newErrors.email = 'Пожалуйста, введите адрес электронной почты'
      isValid = false
    } else {
      newErrors.email = ''
    }

    if (!userData.password) {
      newErrors.password = 'Пожалуйста, введите пароль'
      isValid = false
    } else {
      newErrors.password = ''
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async () => {
    const isValid = handleValidation()

    if (isValid) {
      const { password, username } = userData

      try {
        const res = await login({ username, password }).unwrap()
        sessionStorage.setItem('token', res.token)
        if (res.token) {
          navigate('/')
        } else {
          navigate('/login', { state: { from: location } })
        }
      } catch (e) {}
    }
  }

  return (
    <Box
      sx={{ height: '100vh' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{ boxShadow: 3, borderRadius: 2 }}
        p={5}
        width={500}
        height={480}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={logo} alt="logo" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          flexDirection="column"
          height="70%"
          mt={10}
        >
          <Box>
            <TextField
              color="secondary"
              fullWidth
              placeholder="Логин"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              error={Boolean(errors.username)}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              placeholder="Пароль"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {isError && (
              <div className="flex justify-center pt-2 text-md text-red-500">
                Рамз нодуруст аст!
              </div>
            )}
          </Box>

          {isLoading ? (
            <LoadingButton fullWidth loading variant="contained">
              Submit
            </LoadingButton>
          ) : (
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Дохилшави
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
