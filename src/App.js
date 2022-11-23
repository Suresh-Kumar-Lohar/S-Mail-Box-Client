import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import { Route, Redirect } from 'react-router-dom'

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
    </div>
  )
}

export default App
