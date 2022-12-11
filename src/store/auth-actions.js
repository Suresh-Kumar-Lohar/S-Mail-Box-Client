import { authActions } from './authSlice'

export const loginUser = (user, isUser) => {
  return async (dispatch) => {
    let url
    if (isUser) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCmrA24wNy_fXC0Ubl9rtf71wO-0tTdQI'
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCmrA24wNy_fXC0Ubl9rtf71wO-0tTdQI'
    }
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (resp.ok) {
        const data = await resp.json()
        localStorage.setItem(
          'details',
          JSON.stringify({ token: data.idToken, email: user.email })
        )
        dispatch(authActions.login({ token: data.idToken, email: user.email }))
      } else {
        let errorMessage = 'Authentication failed'
        const data = await resp.json()
        console.log(data)
        errorMessage = data.error.message
        throw new Error(errorMessage)
      }
    } catch (error) {
      window.alert(error.message)
      console.log(error.message)
    }
  }
}
