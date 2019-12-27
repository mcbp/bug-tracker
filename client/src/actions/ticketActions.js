import axios from 'axios'
import {
  TICKETS_LOADING,
  TICKETS_LOADED,
  TICKETS_LOAD_FAIL,
  CLEAR_TICKETS
} from '../actions/types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'

export const loadTickets = (project) => (dispatch) => {

  dispatch({ type: TICKETS_LOADING })

  const url = project ? `/api/tickets?project=${project}` : `/api/tickets`

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
