import {
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATE_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../actions/types'

const initialState = {
  msg: "",
  status: null,
  id: null,
  notifications: []
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg.msg,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: "",
        status: null,
        id: null
      }
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.slice(1)
      }
    default:
      return state
  }
}

export default errorReducer
