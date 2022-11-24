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
    dataType = 'Inbox'
  } else if (emailList.isSent) {
    dataType = 'Sent'
  }

  const tmp = new Date(item.date)
  const dateTime = tmp.toLocaleString()
  const shortSubject = item.subject.slice(0, 25)
  const shortContent = item.content.slice(0, 30)
  // console.log(item.id)

  let tmp1 = item.from.split('@')[0]
  let tmp2 = item.from.split('@')[1]
  let tmp3 = tmp2.split('.')[0]
  let tmp4 = tmp2.split('.')[1]
  let editedMail = tmp1 + tmp3 + tmp4

  return (
    <div className={classes.emailList}>
      <li className={classes.li1}>
        <Link to={`/email/${item.id}`}>
          <h3>{item.from}</h3>
        </Link>
        <Link to={`/email/${item.id}`}>
          <div className={classes.Edetails}>
            <h4>{shortSubject}</h4>
            <p>{shortContent}</p>
          </div>
        </Link>
        <div className={classes.a1}>
          <p>{dateTime}</p>
          <button
            onClick={() => {
              console.log('here')
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
