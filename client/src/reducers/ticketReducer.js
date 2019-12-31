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

const initialState = {
  isLoading: false,
  tickets: [],
  currentTicket: ""
}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case TICKETS_LOADED:
      return {
        ...state,
        isLoading: false,
        tickets: action.payload
      }
    case CLEAR_TICKETS:
      return {
        ...state,
        tickets: []
      }
    case GET_CURRENT_TICKET_SUCCESS:
    case GET_CURRENT_TICKET_FAIL:
    case EDIT_TICKET_SUCCESS:
      return {
        ...state,
        currentTicket: action.payload
      }
    case REMOVE_CURRENT_TICKET:
      return {
        ...state,
        currentTicket: ""
      }
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        currentTicket: {
          isDeleted: true
        }
      }
    case TICKETS_LOAD_FAIL:
    case CREATE_TICKET_SUCCESS:
    case CREATE_TICKET_FAIL:
    case EDIT_TICKET_FAIL:
    case DELETE_TICKET_FAIL:
    default:
      return state
  }
}

export default ticketReducer
