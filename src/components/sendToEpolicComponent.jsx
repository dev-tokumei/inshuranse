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

import { usePostDataMutation } from '../app/store/api'
import { LoadingButton } from '@mui/lab'
import { NavLink } from 'react-router-dom'

const initialState = {
  serviceName: '',
  start_data: '',
  end_data: '',
  insurance_status: 'Активно',
  insurance_type: 'Страхование коммерческой недвижимости',
}

export const SendToEpolicComponent = () => {
  const [data, setData] = useState(initialState)
  const [postData, { isLoading }] = usePostDataMutation()

  const handleInsuranceTypeChange = (event) => {
    setData({ ...data, insurance_type: event.target.value })
  }
  const handleCancel = () => {
    setData(initialState)
  }

  return (
    <>
      <Box py={2} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3">Отравка данных на E-polic</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <TextField fullWidth label="Названия Сервиса " />
        <FormControl fullWidth sx={{ mb: 2.2, ml: 5 }}>
          <Typography fontSize="12px">Тип страхования</Typography>
          <Select
            value={data.insurance_type}
            onChange={handleInsuranceTypeChange}
            name="insurance_type"
          >
            {[
              'Страхование коммерческой недвижимости',
              'Физическое повреждение автомобиля, пожар и кража (КАСКО)',
              'Добровольное страхование автогражданской ответственности',
              'Страхование от несчастных случаев при ДТП',
              'Страхование грузов',
              'Страхование гражданской ответственности',
              'Страхование всех рисков Строительно-монтажных работ',
              'Медицинское страхование туристов',
              'Коллективное страхование от несчастных случаев и болезней',
              'Добровольное медицинское страхование',
              'Обязательное страхование автогражданской ответственности',
              'Страхование ответственности работодателя',
            ].map((insuranceType) => (
              <MenuItem key={insuranceType} value={insuranceType}>
                {insuranceType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Select sx={{ mt: 3, mr: 3 }} fullWidth value={data.insurance_status}>
          <MenuItem value={'Активно'}>Активно</MenuItem>
          <MenuItem value={'Не активно'}>Не активно</MenuItem>
        </Select>
        <FormControl sx={{ mr: 3 }} fullWidth>
          <Typography>Дата начала</Typography>
          <TextField
            type="date"
            value={data.start_data}
            onChange={(e) => {
              setData({ ...data, start_data: e.target.value })
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <Typography>Дата окончания</Typography>
          <TextField
            type="date"
            value={data.end_data}
            onChange={(e) => {
              setData({ ...data, end_data: e.target.value })
            }}
          />
        </FormControl>
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
          <Button variant="contained" onClick={() => {}}>
            Захира кардан
          </Button>
        )}
      </Box>
    </>
  )
}
