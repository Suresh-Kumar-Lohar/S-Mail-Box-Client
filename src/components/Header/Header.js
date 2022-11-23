import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/gmail-logo.jpg'
import backImg from '../../assets/website-support.jpg'
const Header = () => {
  return (
    <>
      <img src={backImg} className={classes.backImg} />
      <header className={classes.header}>
        <div className={classes.headerInside}>
          <img src={logo} alt='gmail' />
          <div className={classes.insideBtn}>
            <p>For Work</p>
            <Link to='/login'>
              <button className={classes.btn1}>Sign in</button>
            </Link>
            <Link to='/login'>
              <button className={classes.btn2}>Create an account</button>{' '}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
