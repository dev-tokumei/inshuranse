import { BASE_URL } from '../../app/store/api'
import axios from 'axios'

const axiosInstance = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

// add request interceptor

axiosInstance?.interceptors?.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// add response interceptor
axiosInstance?.interceptors?.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Если получен код статуса 401, перенаправляем на страницу логина также удаляем токен
      sessionStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
export default axiosInstance
