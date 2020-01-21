import axios from 'axios'
import {
  COMMENTS_LOADING,
  COMMENTS_LOADED,
  COMMENTS_LOAD_FAIL,
  CLEAR_COMMENTS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from '../actions/types'
import { returnErrors, createNotification } from './errorActions'
import { tokenConfig } from './authActions'

export const loadComments = (ticket) => (dispatch) => {

  dispatch({ type: COMMENTS_LOADING })

  axios.get(`/api/comments?ticket=${ticket}`)
    .then(res => dispatch({
      type: COMMENTS_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: COMMENTS_LOAD_FAIL
      })
    })
}

export const clearComments = () => (dispatch => {
  dispatch({
    type: CLEAR_COMMENTS
  })
})

export const createComment = (ticket, submitter, text) => (dispatch, getState) => {

  const body = JSON.stringify({ticket, submitter, text})

  axios.post('/api/comments', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: res.data
      })
      dispatch(createNotification("Comment posted", "success"))
    })
    .then(() => dispatch(loadComments(ticket)))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_COMMENT_FAIL'))
      dispatch({
        type: CREATE_COMMENT_FAIL
      })
    })
}
