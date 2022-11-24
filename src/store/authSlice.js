import { createSlice } from '@reduxjs/toolkit'

// const localData = localStorage.getItem('details')
// const details = JSON.parse(localData)
// let x, y, logged
// if (details) {
//   x = details.token
//   y = details.email
//   logged = true
// } else {
//   x = null
//   y = null
//   logged = false
// }
const initialAuthState = {
  token: null,
  email: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.email = action.payload.email
    },
    logout(state) {
      localStorage.clear()
      state.isLoggedIn = false
      state.token = null
      state.email = null
    },
  },
})

export const authActions = authSlice.actions

export default authSlice
