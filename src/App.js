import SignUp from './pages/SignUp/SignUp'
import { Route, Redirect } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import EditorComp from './components/Editor/EditorComp'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/authSlice'
import EmailBox from './pages/EmailBox/EmailBox'
import { fetchMyEmailData } from './store/email-actions'
import MailPage from './pages/MailPage'
import './App.css'
import { useHistory } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth)
  const history = useHistory()

  useEffect(() => {
    const localData = localStorage.getItem('details')
    const details = JSON.parse(localData)
    let x, y, logged
    if (details) {
      x = details.token
      y = details.email

      // logged = true
      dispatch(authActions.login({ token: x, email: y }))
      setInterval(() => dispatch(fetchMyEmailData(y)), 2000)
    }
  }, [])

  return (
    <div>
      <button
        className='logout'
        onClick={() => {
          localStorage.clear()
          history.replace('/')
          dispatch(authActions.logout())
        }}
      >
        Logout
      </button>
      <Route path='/' exact>
        <Redirect to='/welcome' />
      </Route>
      <Route path='/welcome'>
        <Welcome />
      </Route>
      <Route path='/login'>
        <SignUp />
      </Route>
      <Route path='/email/:emailId' exact>
        {isAuth.isLoggedIn && <MailPage />}
        {!isAuth.isLoggedIn && <Redirect to='/login' />}
      </Route>
      <Route path='/email'>
        {isAuth.isLoggedIn && <EmailBox />}
        {!isAuth.isLoggedIn && <Redirect to='/login' />}
      </Route>
      <Route path='/editor'>
        {isAuth.isLoggedIn && <EditorComp />}
        {!isAuth.isLoggedIn && <Redirect to='/login' />}
      </Route>
    </div>
  )
}

export default App
