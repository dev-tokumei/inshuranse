import { configureStore } from '@reduxjs/toolkit'
import { postApi } from './api'
import { authApi } from './api/auth.api'
import { userApi } from './api/user.api'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
})
