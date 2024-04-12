import { AppBar, Typography } from '@mui/material'
import HomeComponent from './components/home.component'

export const App = () => {
  return (
    <div className="App">
      <AppBar sx={{ p: 2 }} color="primary" position="fixed">
        <Typography variant="h6" color="inherit" component="div">
          «ДС-сугурта» - Админ
        </Typography>
      </AppBar>
      <HomeComponent />
    </div>
  )
}
