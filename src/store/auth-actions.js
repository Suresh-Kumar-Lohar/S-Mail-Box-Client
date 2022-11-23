import { authActions } from './authSlice'
import { useHistory } from 'react-router-dom'

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const res = await fetch('https://money-f2b15.firebaseio.com/cart.json')
//       if (!res.ok) {
//         throw new Error('could not fetch cart data !')
//       }
//       const data = await res.json()

//       return data
//     }

//     try {
//       const cartData = await fetchData()
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity,
//         })
//       )
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error...',
//           message: 'Sending cart data failed!',
//         })
//       )
//     }
//   }
// }

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
