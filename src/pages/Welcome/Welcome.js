import React from 'react'
import classes from './Welcome.module.css'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className={classes.welcome}>
      <p>
        <i>Welcome to Mail CLient Box!!!</i>
      </p>
      <p className={classes.p2}>
        <i>
          Your profile is incomplete.{' '}
          <span>
            <Link to='/updateProfile'>Complete Now</Link>
          </span>
        </i>
      </p>
    </div>
  )
}

export default Welcome
