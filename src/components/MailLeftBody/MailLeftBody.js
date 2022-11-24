import React from 'react'
import classes from './MailLeftBody.module.css'
import logo from '../../assets/gmail-logo.jpg'
import { RiInboxArchiveFill } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import { GrEdit } from 'react-icons/gr'
import { MdOutlineUnfoldMore } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { emailActions } from '../../store/emailSlice'

const MailLeftBody = () => {
  const dispatch = useDispatch()
  const emailList = useSelector((state) => state.emailData)

  let totalUnread = 0
  emailList.inboxData.forEach((each) => {
    if (each.isRead === false) {
      totalUnread++
    }
  })

  return (
    <div className={classes.leftBody}>
      <div className={classes.leftInside}>
        <img className={classes.insideImg} src={logo} alt='gmail' />
        <button
          onClick={() => {
            dispatch(emailActions.startEditing())
          }}
        >
          {<GrEdit size={20} />} Compose
        </button>
        <div className={classes.linkType}>
          <div>
            <RiInboxArchiveFill size={30} />
          </div>
          <p onClick={() => dispatch(emailActions.fetchInboxData())}>
            Inbox ({totalUnread})
          </p>
        </div>
        <div className={classes.linkType}>
          <div>
            <IoIosSend size={30} />
          </div>
          <p onClick={() => dispatch(emailActions.fetchSentData())}>
            Sent ({emailList.sentData.length})
          </p>
        </div>
        <div className={classes.linkType}>
          <div>
            <MdOutlineUnfoldMore size={30} />
          </div>
          <p>More</p>
        </div>
      </div>
    </div>
  )
}

export default MailLeftBody
