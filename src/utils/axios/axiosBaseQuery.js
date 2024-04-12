import axiosInstance from './axiosInstance'

export const axiosBaseQuery =
  ({ baseURL } = { baseURL: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseURL + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status || err.message,
          data: err.response?.data || err.message,
        },
      }
    }
  }
