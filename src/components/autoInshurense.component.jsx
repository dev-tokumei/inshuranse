import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { getFieldLabel } from '../utils'
import { usePostDataMutation } from '../app/store/api'
import { LoadingButton } from '@mui/lab'
import { NavLink } from 'react-router-dom'

const initialState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  address: '',
  vin: '',
  registration_number: '',
  files: [],
  duration: '3',
}

export const AutoInshurenseComponent = () => {
  const [data, setData] = useState(initialState)
  const [postData, { isLoading }] = usePostDataMutation()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    // Очищаем ошибку, если поле было изменено
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }))
  }

  const handleFileChange = (e, index) => {
    const newFiles = [...data.files]
    newFiles[index] = e.target.files[0]
    setData((prevData) => ({
      ...prevData,
      files: newFiles,
    }))
  }

  const handleSubmit = async () => {
    const requiredFields = [
      'fullName',
      'phoneNumber',
      'email',
      'vin',
      'address',
      'registration_number',
    ]
    const newErrors = {}
    let isValid = true

    requiredFields.forEach((fieldName) => {
      if (!data[fieldName]) {
        newErrors[fieldName] = 'Это поле обязательно для заполнения'
        isValid = false
      }
    })

    if (!isValid) {
      setErrors(newErrors)
      return
    }

    try {
      await postData(data).unwrap()
      handleCancel()
    } catch (e) {}
  }

  const handleCancel = () => {
    setData(initialState)
    setErrors({})
  }

  return (
    <>
      <Box py={2} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3">Суғуртаи мошин</Typography>
      </Box>
      {Object.entries(data).map(([fieldName, fieldValue]) => {
        if (fieldName === 'files' || fieldName === 'duration') {
          return null
        }
        return (
          <TextField
            color="secondary"
            key={fieldName}
            name={fieldName}
            value={fieldValue}
            onChange={handleChange}
            sx={{ mb: 2 }}
            fullWidth
            label={getFieldLabel(fieldName)} // Получаем переведенную метку
            error={!!errors[fieldName]}
            helperText={errors[fieldName]}
          />
        )
      })}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography>Длительность страхования</Typography>
        <Select value={data.duration} onChange={handleChange} name="duration">
          <MenuItem value={3}>3 месяц</MenuItem>
          <MenuItem value={6}>6 месяц</MenuItem>
          <MenuItem value={12}>12 месяц</MenuItem>
        </Select>
      </FormControl>
      <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Button
            variant="outlined"
            color="inherit"
            component="label"
            key={index}
          >
            <FileUploadOutlinedIcon /> ({index})
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, index - 1)}
            />
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent="end" mt={2}>
        <NavLink to={'/'}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 2 }}
            onClick={handleCancel}
          >
            Бекор кардан
          </Button>
        </NavLink>

        {isLoading ? (
          <LoadingButton loading variant="contained" aria-label="Submit">
            Submit
          </LoadingButton>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Захира кардан
          </Button>
        )}
      </Box>
    </>
  )
}
