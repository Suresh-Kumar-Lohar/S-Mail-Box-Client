import React from 'react'
import classes from './MailPage.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const MailPage = () => {
  const history = useHistory()
  const emailList = useSelector((state) => state.emailData)
  const params = useParams()

  let Data = {}

  emailList.inboxData.forEach((each) => {
    if (each.id === params.emailId) {
      Data.content = each.content
      Data.from = each.from
      Data.to = each.to
      Data.date = each.date
      Data.subject = each.subject
    }
  })

  // console.log(Data)

  return (
    <div className={classes.mailPage}>
      <button
        className={classes.mp0}
        onClick={() => {
          history.replace('/email')
        }}
      >
        Close
      </button>
      <h2>Re : {Data.subject}</h2>
      <div className={classes.mp1}>
        <h4>From : {Data.from}</h4>
        <p>Date : {Data.date}</p>
      </div>
      <h4 className={classes.mp2}>To : {Data.to}</h4>
      <p className={classes.mp3}>{Data.content}</p>
    </div>
  )
}

export default MailPage
