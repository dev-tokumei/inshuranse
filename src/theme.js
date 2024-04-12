import { createTheme } from '@mui/material'

export let theme = createTheme({
  palette: {
    primary: {
      main: '#FF7528',
      contrastText: '#f2f2f2',
    },
    secondary: {
      main: '#3d5afe',
      contrastText: '#f2f2f2',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3d5afe', // Цвет границы при наведении
          },
          '&:focus-within .lock-icon': {
            color: '#3d5afe', // Цвет иконки при активации
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#FF7528', // Цвет фона при наведении
          },
        },
      },
    },

    MuiNavLink: {
      marginBottom: 3,
      borderRadius: '10px',
    },
  },
})
