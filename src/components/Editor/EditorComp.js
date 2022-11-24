import React, { Fragment, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import classes from './EditorComp.module.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addEmailData } from '../../store/email-actions'
import { emailActions } from '../../store/emailSlice'

const EditorComp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [editorValue, setEditorValue] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [mailSent, setMailSent] = useState(false)

  const onEditorStateChange = (contentState) => {
    let text = ''
    contentState.blocks.forEach((e) => {
      text += ` ${e.text}`
    })
    setEditorValue(text)
  }

  const EmailHandler = async (event) => {
    event.preventDefault()
    const date = new Date()
    // console.log(auth.email)

    const mailObj = {
      from: auth.email,
      to: email,
      date: date,
      subject: subject,
      content: editorValue,
    }

    dispatch(addEmailData(email, mailObj))
    dispatch(emailActions.stopEditing())
    console.log(mailObj)
  }
  return (
    <div className={classes.editorComp}>
      <form onSubmit={EmailHandler} className={classes.mailForm}>
        <div className={classes.eHeader}>
          <p>New Message</p>
          <div className={classes.eHeBtn}>
            <p>-</p>
            <p onClick={() => dispatch(emailActions.stopEditing())}>x</p>
          </div>
        </div>
        <input
          type='email'
          placeholder='To'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Subject'
          id='subject'
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className={classes.mailBox}>
          <Editor
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onContentStateChange={onEditorStateChange}
            value={editorValue}
          />
        </div>
        {!mailSent && <button type='submit'>Send</button>}
        {mailSent && (
          <p className={classes.sentP}>Mail sent successfully...!</p>
        )}
      </form>
    </div>
  )
}

export default EditorComp
