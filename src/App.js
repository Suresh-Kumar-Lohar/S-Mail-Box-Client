import Header from './components/Header/Header'
import SignUp from './pages/SignUp/SignUp'
import { Route, Redirect } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'

function App() {
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
    </div>
  )
}

export default App
