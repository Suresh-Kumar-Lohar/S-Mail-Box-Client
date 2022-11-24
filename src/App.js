import Header from './components/Header/Header'
import SignUp from './pages/SignUp/SignUp'
import { Route, Redirect } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import EditorComp from './components/Editor/EditorComp'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from './store/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const localData = localStorage.getItem('details')
    const details = JSON.parse(localData)
    let x, y, logged
    if (details) {
      x = details.token
      y = details.email
      // logged = true
      dispatch(authActions.login({ token: x, email: y }))
    }
  }, [])

  return (
    <div>
      <Route path='/' exact>
        <Redirect to='/gmail' />
      </Route>
      <Route path='/gmail'>
        <Header />
      </Route>
      <Route path='/login'>
        <SignUp />
      </Route>
      <Route path='/welcome'>
        <Welcome />
      </Route>
      <Route path='/editor'>
        <EditorComp />
      </Route>
    </div>
  )
}

export default App
