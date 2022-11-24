import React, { useState, useEffect } from 'react'
import classes from './SignUp.module.css'
import googleLogo from '../../assets/googleLogo.png'
import { Link } from 'react-router-dom'
import { loginUser } from '../../store/auth-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isUser, setIsUser] = useState(true)

  useEffect(() => {
    if (auth.isLoggedIn) {
      history.replace('/email')
    }
  }, [auth, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if (email && password && (confirmPass || isUser)) {
      if (password === confirmPass || isUser) {
        console.log(email, password, confirmPass)
        dispatch(loginUser({ email: email, password: password }, isUser))

        setEmail('')
        setPassword('')
        setConfirmPass('')
      } else {
        setConfirmPass('')
        alert('Please Re-enter Correct Confirm Password')
      }
    } else {
      alert('Please enter all details...')
    }
  }

  const userHandler = (e) => {
    setIsUser(!isUser)
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.formInside}>
          <img className={classes.logo} src={googleLogo} alt='googleLogo' />
          <p className={classes.pp1}>{isUser ? 'Sign in' : 'Sign up'}</p>
          <p className={classes.pp2}>to continue to Gmail</p>
          <div className={classes.enterVal}>
            <input
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.enterVal}>
            <input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isUser && (
            <div className={classes.enterVal}>
              <input
                id='confirmPass'
                type='password'
                placeholder='Confirm Password'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          )}
          <Link to='/forgot-password'>
            <p>Forgot Password?</p>
          </Link>

          <div className={classes.belowBtns}>
            <p className={classes.btn2} onClick={userHandler}>
              {isUser ? 'Create account' : 'Have an account? login'}
            </p>
            <button type='submit'>Next</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
