import axios from 'axios'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RENAME_SUCCESS,
  RENAME_FAIL,
  REPASSWORD_SUCCESS,
  REPASSWORD_FAIL
} from '../actions/types'
import { returnErrors } from './errorActions'

// Check token then load user - auto sign in
export const loadUser = () => (dispatch, getState) => {

  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Register a user and give back user data & token via API
export const register = ({name, email, password}) => dispatch => {
  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  // Set body
  const body = JSON.stringify({name, email, password})

  axios.post('/api/users', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

// Log in a user and give back user data & token via API
export const login = ({email, password}) => dispatch => {
  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  // Set body
  const body = JSON.stringify({email, password})

  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const rename = (name) => (dispatch, getState) => {
  console.log(name)
  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      const body = JSON.stringify({...res.data, ...name})
      axios.post('/api/users/name', body, tokenConfig(getState))
        .then(res => dispatch({
          type: RENAME_SUCCESS,
          payload: res.data
        }))
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'RENAME_FAIL'))
          dispatch({
            type: RENAME_FAIL
          })
        })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const repassword = (currentPassword, newPassword) => (dispatch, getState) => {

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      const body = JSON.stringify({...res.data, currentPassword, newPassword})
      axios.post('/api/users/password', body, tokenConfig(getState))
        .then(res => dispatch({
          type: REPASSWORD_SUCCESS,
          payload: res.data
        }))
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'REPASSWORD_FAIL'))
          dispatch({
            type: REPASSWORD_FAIL
          })
        })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Setup config/headers and token
export const tokenConfig = getState => {
  // Local storage token
  const token = getState().auth.token
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  // If token add to header
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
}
