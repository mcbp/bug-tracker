import {
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATE_NOTIFICATION,
  CLEAR_NOTIFICATION
} from './types'

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {msg, status, id}
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}

export const createNotification = notification => (dispatch) => {
  dispatch({
    type: CREATE_NOTIFICATION,
    payload: notification
  })
  setTimeout(() => {
    dispatch({
      type: CLEAR_NOTIFICATION
    })
  }, 4000)
}
