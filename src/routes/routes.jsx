import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/homePage'
import { ErrorComponent } from '../shared/components/error.component'
import { LoginComponent } from '../components/login.component'
import { AutoInshuransePage } from '../pages/autoInshuransePage'
import { AddInSurancePage } from '../pages/addInSurancePage'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/login',
    element: <LoginComponent />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/autoinshuranse',
    element: <AutoInshuransePage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/addnewinsuransecompany',
    element: <AddInSurancePage />,
    errorElement: <ErrorComponent />,
  },
])
