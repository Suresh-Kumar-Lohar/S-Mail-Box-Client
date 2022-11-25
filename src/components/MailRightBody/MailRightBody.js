import React, { useEffect } from 'react'
import classes from './MailRightBody.module.css'
import { FcSearch } from 'react-icons/fc'
import EmailList from './Emails/EmailList'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMyEmailData } from '../../store/email-actions'

// i'll made for sent mail with reducer and like sent true/false and same with inbox
const MailRightBody = () => {
  const emailList = useSelector((state) => state.emailData)
  const isAuth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // console.log(emailList.inboxData)
  let Data
  if (emailList.isInbox) {
    Data = emailList.inboxData
  } else if (emailList.isSent) {
    Data = emailList.sentData
    // console.log(Data)
  }

  return (
    <div className={classes.rightBody}>
      <div className={classes.enterVal}>
        <input
          id='text '
          type='text'
          placeholder='Find messages, document, photos'
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        <button>
          <FcSearch size={40} />
        </button>
      </div>
      <div className={classes.mrb1}>
        <h4>
          {emailList.isInbox ? 'All Received Mails...' : 'All Sent Mails...'}
        </h4>
        <h3>My Account : {isAuth.email}</h3>
      </div>
      <ul>
        {Data.map((item) => {
          return <EmailList key={item.id} item={item} />
        })}
      </ul>
    </div>
  )
}

export default MailRightBody
