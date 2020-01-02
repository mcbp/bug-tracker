import {
  COMMENTS_LOADING,
  COMMENTS_LOADED,
  COMMENTS_LOAD_FAIL,
  CLEAR_COMMENTS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from '../actions/types'

const initialState = {
  isLoading: false,
  comments: []
}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case COMMENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        comments: action.payload
      }
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      }
    case COMMENTS_LOAD_FAIL:
    case CREATE_COMMENT_SUCCESS:
    case CREATE_COMMENT_FAIL:
    default:
      return state
  }
}

export default commentReducer
