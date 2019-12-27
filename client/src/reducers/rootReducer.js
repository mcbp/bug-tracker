import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import ticketReducer from './ticketReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  project: projectReducer,
  ticket: ticketReducer
})
