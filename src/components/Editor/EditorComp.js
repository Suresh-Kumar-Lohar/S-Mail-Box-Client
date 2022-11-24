import React, { Fragment, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import classes from './EditorComp.module.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const EditorComp = () => {
  const history = useHistory()
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
    const date = new Date()
    console.log(date)
    event.preventDefault()
    const mailObj = {
      email: email,
      date: date,
      subject: subject,
      content: editorValue,
    }
    let tmp1 = email.split('@')[0]
    let tmp2 = email.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let finalMail = tmp1 + tmp3 + tmp4
    console.log(finalMail)

    try {
      const resp = await axios.post(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/${finalMail}.json`,
        mailObj
      )
      console.log(resp)
      if (resp.status === 200) {
        setMailSent(true)
        setTimeout(() => {
          // history.replace('/...')
          setMailSent(false)
        }, 1500)
      } else {
        let errorMessage = 'Sending mail failed'
        const data = await resp.json()
        console.log(data)
        errorMessage = data.error.message
        throw new Error(errorMessage)
      }
    } catch (error) {
      window.alert(error.message)
      console.log(error.message)
    }

    console.log(mailObj)
  }
  return (
    <div className={classes.editorComp}>
      <form onSubmit={EmailHandler} className={classes.mailForm}>
        <div className={classes.eHeader}>
          <p>New Message</p>
          <div className={classes.eHeBtn}>
            <p>-</p>
            <p>x</p>
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
