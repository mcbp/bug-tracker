import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOAD_FAIL,
  SELECT_USER,
  CLEAR_USER,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL
} from '../actions/types'

const initialState = {
  users: [],
  selectedUser: {
    name: ""
  },
  isLoading: false
}

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USERS_LOADED:
      return {
        ...state,
        users: action.payload,
        isLoading: false
      }
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload
      }
    case CLEAR_USER:
      return {
        ...state,
        selectedUser: {
          name: ""
        }
      }
    case USERS_LOAD_FAIL:
    case UPDATE_ROLE_SUCCESS:
    case UPDATE_ROLE_FAIL:
    default:
      return state
  }
}

export default roleReducer
