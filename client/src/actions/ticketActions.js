import axios from 'axios'
import {
  TICKETS_LOADING,
  TICKETS_LOADED,
  TICKETS_LOAD_FAIL,
  CLEAR_TICKETS,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  GET_CURRENT_TICKET_SUCCESS,
  GET_CURRENT_TICKET_FAIL,
  REMOVE_CURRENT_TICKET,
  EDIT_TICKET_SUCCESS,
  EDIT_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL
} from '../actions/types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'

export const loadTickets = (project, search) => (dispatch) => {

  dispatch({ type: TICKETS_LOADING })

  let url = `/api/tickets?`
  if (project) url += `project=${project}&`
  if (search) url += `search=${search}&`

  axios.get(url)
    .then(res => dispatch({
      type: TICKETS_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: TICKETS_LOAD_FAIL
      })
    })
}

export const clearTickets = () => (dispatch) => {
  dispatch({
    type: CLEAR_TICKETS
  })
}

export const createTicket = (title, description, submitter, project,
  ticketType, priority, reloadThisProject) => (dispatch, getState) => {

  const body = JSON.stringify({title, description, submitter, project, ticketType, priority})

  axios.post('/api/tickets', body, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: res.data
      })
    )
    .then(() => dispatch(loadTickets(reloadThisProject)))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_TICKET_FAIL'))
      dispatch({
        type: CREATE_TICKET_FAIL
      })
    })
}

export const getCurrentTicket = currentProject => (dispatch) => {
  axios.get(`/api/tickets?id=${currentProject}`)
    .then(res => dispatch({
      type: GET_CURRENT_TICKET_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: GET_CURRENT_TICKET_FAIL,
        payload: err.response.data
      })
    })
}

export const removeCurrentTicket = () => {
  return {
    type: REMOVE_CURRENT_TICKET
  }
}

export const editTicket = (_id, title, description, project, ticketType, priority, status) => (dispatch, getState) => {

  const body = JSON.stringify({_id, title, description, project, ticketType, priority, status})

  axios.post(`/api/tickets/edit`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: EDIT_TICKET_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_TICKET_FAIL'))
      dispatch({
        type: EDIT_TICKET_FAIL
      })
    })
}

export const deleteTicket = (_id, title) => (dispatch, getState) => {

  const body = JSON.stringify({_id, title})

  axios.post(`/api/tickets/delete`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_TICKET_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_TICKET_FAIL'))
      dispatch({
        type: DELETE_TICKET_FAIL
      })
    })
}
