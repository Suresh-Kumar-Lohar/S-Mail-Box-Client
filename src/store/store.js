import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import emailSlice from './emailSlice'

const store = configureStore({
  reducer: { auth: authSlice.reducer, emailData: emailSlice.reducer },
})

export default store
