import { createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './index'
import { axiosBaseQuery } from '../../../utils/axios/axiosBaseQuery'
const baseQuery = axiosBaseQuery({ baseURL: BASE_URL })
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (arg) => ({
        url: '/logout',
        method: 'POST',
        body: arg,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
