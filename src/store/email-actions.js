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
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails.json`
      )
      // console.log(resp)
      if (resp.status === 200) {
        // console.log(resp)
        const data = resp.data

        // console.log(data)
        const sentMail = []
        const receivedMail = []
        let tmp
        for (const key in data) {
          //   console.log(key)
          for (const mailKey in data[key]) {
            // console.log(mailKey)
            const body = data[key][mailKey]
            // console.log(body)
            // const parsedData = JSON.parse(body)
            // console.log(parsedData)
            if (key === editedMail) {
              tmp = body.from
              receivedMail.unshift({
                id: mailKey,
                from: body.from,
                to: body.to,
                date: body.date,
                subject: body.subject,
                content: body.content,
                isRead: body.isRead,
              })
            }
            // console.log(body.from)
            if (body.from === myEmail) {
              sentMail.unshift({
                id: mailKey,
                from: body.from,
                to: body.to,
                date: body.date,
                subject: body.subject,
                content: body.content,
                isRead: body.isRead,
              })
            }
          }
        }
        // console.log('receivedMail')
        // console.log(receivedMail)
        // console.log('sentMail')
        // console.log(sentMail)
        dispatch(emailActions.updateEmailData({ receivedMail, sentMail }))
        // dispatch(fetchEmailData())
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

export const addEmailData = (email, emailBody) => {
  return async (dispatch) => {
    let tmp1 = email.split('@')[0]
    let tmp2 = email.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4

    try {
      const resp = await axios.post(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}.json`,
        emailBody
      )
      //   console.log(resp)
      if (resp.status === 200) {
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
  // if (type === 'Inbox')
  return async (dispatch) => {
    console.log(email, type, id)
    let tmp1 = email.split('@')[0]
    let tmp2 = email.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let editedMail = tmp1 + tmp3 + tmp4
    // console.log(
    //   `https://mail-box-client-ea769-default-rtdb.firebaseio.com/${editedMail}/${id}.json`
    // )
    try {
      const resp = await axios.delete(
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}/${id}.json`
      )
      //   console.log(resp)
      if (resp.status === 200) {
        // console.log(resp)
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
        `https://mail-box-client-ea769-default-rtdb.firebaseio.com/emails/${editedMail}/${id}.json`,
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
