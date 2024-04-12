import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCreateUserMutation } from '../../app/store/api/user.api'
import { LoadingButton } from '@mui/lab'
export const ModalComponent = ({ open, handleClose }) => {
  const [createUser, { isLoading, isError }] = useCreateUserMutation()
  const [data, setData] = useState({
    username: '',
    password: '',
    adminName: '',
    adminPassword: '',
    role: 'manager',
  })
  const [error, setError] = useState({})

  const close = () => {
    setData({
      username: '',
      password: '',
      adminName: '',
      adminPassword: '',
      role: 'manager',
    })
    handleClose()
  }

  const validateForm = () => {
    const errors = {}

    if (data.username.length < 3) {
      errors.username =
        'Имя пользователя должно содержать как минимум 3 символа'
    }

    if (data.password.length < 6) {
      errors.password = 'Пароль должен содержать как минимум 6 символов'
    }
    if (data.adminName.length < 6) {
      errors.adminPassword = 'Имя админ объязательно'
    }
    if (data.adminPassword.length < 6) {
      errors.adminPassword = 'Пароль должен содержать как минимум 6 символов'
    }

    setError(errors)

    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        await createUser(data).unwrap()
        onclose()
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{ boxShadow: 3, borderRadius: 2 }}
        p={5}
        width={500}
        // height={450}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          flexDirection="column"
          height="70%"
        >
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ px: 2, py: 3 }} fontWeight="700">
                Добавить новый пользоваиель
              </Typography>
              <IconButton onClick={close}>
                <CloseIcon color="primary" />
              </IconButton>
            </Box>
            <TextField
              color="secondary"
              fullWidth
              label="Имя пользователь"
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              error={!!error.username}
              helperText={error.username}
            />
            <TextField
              sx={{ mt: 2 }}
              color="secondary"
              fullWidth
              label="Пароль"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              error={!!error.password}
              helperText={error.password}
            />
            <Select
              sx={{ mt: 2 }}
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              fullWidth
            >
              <MenuItem value={'admin'}>Админ</MenuItem>
              <MenuItem value={'manager'}>Менеджер</MenuItem>
            </Select>
            <TextField
              color="secondary"
              fullWidth
              label="Имя Администратор"
              sx={{ mt: 2 }}
              type="text"
              value={data.adminName}
              onChange={(e) => setData({ ...data, adminName: e.target.value })}
              error={!!error.adminName}
              helperText={error.adminName}
            />
            <TextField
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              label="Пароль администратор"
              type="password"
              value={data.adminPassword}
              error={!!error.adminPassword}
              helperText={error.adminPassword}
              onChange={(e) =>
                setData({ ...data, adminPassword: e.target.value })
              }
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
              Создать Пользователь
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}
