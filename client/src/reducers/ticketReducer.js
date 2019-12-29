import {
  TICKETS_LOADING,
  TICKETS_LOADED,
  TICKETS_LOAD_FAIL,
  CLEAR_TICKETS,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL
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
    case TICKETS_LOAD_FAIL:
    case CREATE_TICKET_SUCCESS:
    case CREATE_TICKET_FAIL:
    default:
      return state
  }
}

export default ticketReducer
