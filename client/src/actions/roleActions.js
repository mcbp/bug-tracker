import axios from 'axios'
import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOAD_FAIL,
  SELECT_USER,
  CLEAR_USER,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL
} from '../actions/types'
import { returnErrors, createNotification } from './errorActions'
import { tokenConfig } from './authActions'

export const loadUsers = searchQuery => (dispatch) => {

  dispatch({ type: USERS_LOADING })

  axios.get(`/api/users?search=${searchQuery}`)
    .then(res => dispatch({
      type: USERS_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: USERS_LOAD_FAIL
      })
    })
}

export const selectUser = user => (dispatch) => {
  dispatch({
    type: SELECT_USER,
    payload: user
  })
}

export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER
  })
}

export const updateRole = (_id, newRole) => (dispatch, getState) => {

  const body = JSON.stringify({_id, newRole})

  axios.post('/api/users/role', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_ROLE_SUCCESS
      })
      dispatch(createNotification("User role updated", "success"))
    })
    .then(() => dispatch(loadUsers("")))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_ROLE_FAIL'))
      dispatch({
        type: UPDATE_ROLE_FAIL
      })
    })
}
