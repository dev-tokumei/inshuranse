import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'http://192.168.41.90:8080/'
const token = sessionStorage.getItem('token')
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseURL: BASE_URL }),
  tagTypes: ['postApi'],
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: (data) => {
        const formData = new FormData()
        data.files.forEach((p, index) => {
          formData.append(`p${index}`, p)
        })

        Object.keys(data).forEach((key) => {
          if (key !== 'p') {
            formData.append(key, data[key])
          }
        })

        return {
          url: '/add',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
    }),
  }),
})

export const { usePostDataMutation } = postApi
