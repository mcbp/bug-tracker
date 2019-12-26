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

const initialState = {
  isLoading: false,
  projects: [],
  currentProject: ""
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case PROJECTS_LOADED:
      return {
        ...state,
        isLoading: false,
        projects: action.payload
      }
    case GET_CURRENT_PROJECT_SUCCESS:
    case GET_CURRENT_PROJECT_FAIL:
      return {
        ...state,
        currentProject: action.payload
      }
    case REMOVE_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: ""
      }
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: {
          isDeleted: true
        }
      }
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload
      }
    case PROJECTS_LOAD_FAIL:
    case CREATE_PROJECT_SUCCESS:
    case CREATE_PROJECT_FAIL:
    case EDIT_PROJECT_FAIL:
    case DELETE_PROJECT_FAIL:
    default:
      return state
  }
}

export default projectReducer
