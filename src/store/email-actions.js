import axios from 'axios'
import { emailActions } from './emailSlice'

export const fetchMyEmailData = (myEmail) => {
  return async (dispatch) => {
    let tmp1 = myEmail.split('@')[0]
    let tmp2 = myEmail.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4
    // console.log(editedMail)
    try {
      const resp = await axios.get(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}.json`
      )
      // console.log(resp)
      if (resp.status === 200) {
        // console.log(resp)
        const data = resp.data

        const sentMailTmp = data.sent
        // console.log(sentMailTmp)
        const receivedMailTmp = data.inbox
        // console.log(receivedMailTmp)
        let tmp
        let sentMail = []
        let receivedMail = []

        for (let key in sentMailTmp) {
          let body = sentMailTmp[key]
          // console.log(body)
          sentMail.unshift({
            id: key,
            from: body.from,
            to: body.to,
            date: body.date,
            subject: body.subject,
            content: body.content,
            isRead: body.isRead,
          })
        }

        for (let key in receivedMailTmp) {
          let body = receivedMailTmp[key]
          // console.log(body)
          receivedMail.unshift({
            id: key,
            from: body.from,
            to: body.to,
            date: body.date,
            subject: body.subject,
            content: body.content,
            isRead: body.isRead,
          })
        }
        // console.log('receivedMail')
        // console.log(receivedMail)
        // console.log('sentMail')
        // console.log(sentMail)
        dispatch(emailActions.updateEmailData({ receivedMail, sentMail }))
      } else {
        let errorMessage = 'Sending mail failed'
        const data = await resp.json()
        console.log(data)
        errorMessage = data.error.message
        throw new Error(errorMessage)
      }
    } catch (error) {
      // window.alert(error.message)
      console.log(error.message)
    }
  }
}

export const addEmailData = (email, emailBody) => {
  return async (dispatch) => {
    let tmp1 = email.split('@')[0]
    let tmp2 = email.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4

    try {
      const resp = await axios.post(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}/inbox.json`,
        emailBody
      )
      //   console.log(resp)
      if (resp.status === 200) {
        let tmp1 = emailBody.from.split('@')[0]
        let tmp2 = emailBody.from.split('@')[1]
        let tmp3 = tmp2.split('.')[0]
        let tmp4 = tmp2.split('.')[1]
        let sentEditedMail = tmp1 + tmp3 + tmp4

        const resp = await axios.post(
          `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${sentEditedMail}/sent.json`,
          emailBody
        )
        // console.log(resp)
        dispatch(fetchMyEmailData(emailBody.from))
        dispatch(emailActions.stopEditing())
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
  }
}

export const deleteEmailData = (email, type, id) => {
  return async (dispatch) => {
    let deleteKey
    if (type === 'inbox') {
      deleteKey = 'inbox'
    } else if (type === 'sent') {
      deleteKey = 'sent'
    }
    let tmp1 = email.split('@')[0]
    let tmp2 = email.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4

    // console.log(editedMail, deleteKey, id)
    try {
      const resp = await axios.delete(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}/${deleteKey}/${id}.json`
      )
      //   console.log(resp)
      if (resp.status === 200) {
        console.log(resp)
        dispatch(fetchMyEmailData(email))
      } else {
        let errorMessage = 'Deleting mail failed'
        const data = await resp.json()
        console.log(data)
        errorMessage = data.error.message
        throw new Error(errorMessage)
      }
    } catch (error) {
      window.alert(error.message)
      console.log(error.message)
    }
  }
}

export const updateEmailData = (emailBody, id) => {
  return async (dispatch) => {
    let tmp1 = emailBody.to.split('@')[0]
    let tmp2 = emailBody.to.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4

    try {
      const resp = await axios.put(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}/inbox/${id}.json`,
        emailBody
      )
      //   console.log(resp)
      if (resp.status === 200) {
        // console.log(resp)
        dispatch(fetchMyEmailData(emailBody.to))
        // dispatch(emailActions.stopEditing())
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
  }
}
