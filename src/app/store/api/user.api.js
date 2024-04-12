import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './index'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseURL: BASE_URL }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => {
        const { adminName, adminPassword, username, password } = user

        const basicAuth = btoa(`${adminName}:${adminPassword}`)

        const newUser = {
          username,
          password,
        }

        return {
          url: '/register',
          method: 'POST',
          body: newUser,
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        }
      },
    }),
  }),
})

export const { useCreateUserMutation } = userApi
