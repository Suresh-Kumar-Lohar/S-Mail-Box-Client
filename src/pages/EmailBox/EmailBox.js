import React from 'react'
import EditorComp from '../../components/Editor/EditorComp'
import MailLeftBody from '../../components/MailLeftBody/MailLeftBody'
import MailRightBody from '../../components/MailRightBody/MailRightBody'
import classes from './EmailBox.module.css'
import { useSelector } from 'react-redux'
// import bgImg from '../../assets/bg1.webp'

const EmailBox = () => {
  const emailList = useSelector((state) => state.emailData)
  return (
    <div className={classes.emailBox}>
      {/* <img className={classes.bgImg} src={bgImg} alt='background' /> */}
      {emailList.isEditing && <EditorComp />}
      <MailLeftBody />
      <MailRightBody />
    </div>
  )
}

export default EmailBox
