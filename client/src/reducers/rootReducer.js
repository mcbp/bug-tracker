import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import ticketReducer from './ticketReducer'
import commentReducer from './commentReducer'
import roleReducer from './roleReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  project: projectReducer,
  ticket: ticketReducer,
  comment: commentReducer,
  role: roleReducer
})
