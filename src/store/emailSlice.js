import { createSlice } from '@reduxjs/toolkit'

const emailSlice = createSlice({
  name: 'emailData',
  initialState: {
    inboxData: [],
    sentData: [],
    isSent: false,
    isInbox: true,
    isEditing: false,
  },
  reducers: {
    updateEmailData(state, action) {
      // console.log(action.payload)
      state.inboxData = [...action.payload.receivedMail]
      state.sentData = [...action.payload.sentMail]
    },
    fetchSentData(state) {
      state.isSent = true
      state.isInbox = false
    },
    fetchInboxData(state) {
      state.isInbox = true
      state.isSent = false
    },
    startEditing(state) {
      state.isEditing = true
    },
    stopEditing(state) {
      state.isEditing = false
    },
  },
})

export const emailActions = emailSlice.actions

export default emailSlice
