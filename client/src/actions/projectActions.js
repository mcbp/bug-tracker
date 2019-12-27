import axios from 'axios'
import {
  PROJECTS_LOADING,
  PROJECTS_LOADED,
  PROJECTS_LOAD_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  GET_CURRENT_PROJECT_SUCCESS,
  GET_CURRENT_PROJECT_FAIL,
  REMOVE_CURRENT_PROJECT,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL
} from '../actions/types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'

export const loadProjects = () => (dispatch) => {

  dispatch({ type: PROJECTS_LOADING })

  axios.get('/api/projects')
    .then(res => dispatch({
      type: PROJECTS_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: PROJECTS_LOAD_FAIL
      })
    })
}

export const createProject = (name, description) => (dispatch, getState) => {

  const body = JSON.stringify({name, description})

  axios.post('/api/projects', body, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: res.data
      })
    )
    .then(() => dispatch(loadProjects()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_PROJECT_FAIL'))
      dispatch({
        type: CREATE_PROJECT_FAIL
      })
    })
}

export const getCurrentProject = currentProject => (dispatch) => {
  axios.get(`/api/projects/${currentProject}`)
    .then(res => dispatch({
      type: GET_CURRENT_PROJECT_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PROJECT_FAIL,
        payload: err.response.data
      })
    })

}

export const removeCurrentProject = () => {
  return {
    type: REMOVE_CURRENT_PROJECT
  }
}

export const editProject = (_id, name, description) => (dispatch, getState) => {

  const body = JSON.stringify({_id, name, description})

  axios.post(`/api/projects/edit`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: EDIT_PROJECT_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_PROJECT_FAIL'))
      dispatch({
        type: EDIT_PROJECT_FAIL
      })
    })
}

export const deleteProject = (_id, name) => (dispatch, getState) => {

  const body = JSON.stringify({_id, name})

  axios.post(`/api/projects/delete`, body, tokenConfig(getState))
    .then(res => {
      console.log(res)
      dispatch({
        type: DELETE_PROJECT_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_PROJECT_FAIL'))
      dispatch({
        type: DELETE_PROJECT_FAIL
      })
    })
}
