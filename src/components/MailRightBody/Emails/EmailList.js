import React from 'react'
import classes from './EmailList.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmailData } from '../../../store/email-actions'

const EmailList = ({ item }) => {
  const dispatch = useDispatch()
  const emailList = useSelector((state) => state.emailData)
  const auth = useSelector((state) => state.auth)
  const day = item.date.toLocaleString('en-US', { day: '2-digit' })
  //   const day = item.date.toLocaleString('en-US', { day: '2-digit' })

  let dataType
  if (emailList.isInbox) {
    dataType = 'inbox'
  } else if (emailList.isSent) {
    dataType = 'sent'
  }
  const tmp = new Date(item.date)
  const dateTime = tmp.toLocaleString()
  let shortSubject = ''
  let shortContent = ''
  if (item.subject.length > 25) {
    shortSubject = item.subject.slice(0, 25)
  }
  if (item.content.length > 25) {
    shortContent = item.content.slice(0, 30)
  }

  return (
    <div className={classes.emailList}>
      <li className={classes.li1}>
        {!item.isRead && emailList.isInbox && (
          <div className={classes.read}></div>
        )}
        {item.isRead && emailList.isInbox && (
          <div className={classes.ignore}></div>
        )}

        <Link to={`/email/${item.id}`}>
          <h3>{emailList.isInbox ? item.from : item.to}</h3>
        </Link>
        <Link to={`/email/${item.id}`}>
          <div className={classes.Edetails}>
            <h4>{shortSubject.length === 0 ? item.subject : shortSubject}</h4>
            <p>{shortContent.length === 0 ? item.content : shortContent}</p>
          </div>
        </Link>
        <div className={classes.a1}>
          <p>{dateTime}</p>
          <button
            onClick={() => {
              dispatch(deleteEmailData(auth.email, dataType, item.id))
            }}
          >
            X
          </button>
        </div>
      </li>
    </div>
  )
}

export default EmailList
