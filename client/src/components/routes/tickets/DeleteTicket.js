import React, { useState, useEffect, Fragment } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import FormInstructions from '../../bits/FormInstructions'
import { connect } from 'react-redux'
import { deleteTicket } from '../../../actions/ticketActions'
import { clearErrors } from '../../../actions/errorActions'

const DeleteTicket = props => {

  const { error, clearErrors, deleteTicket, currentTicket } = props

  const [deleteTitle, setDeleteTitle] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (error.id === 'DELETE_TICKET_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])

  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const instructions = [
    `WARNING: Deleting a ticket cannot be undone.
    Please type the current ticket title to confirm the deletion.`
  ]

  return (
    <Fragment>

      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 purple-form">
        <div className="row">

          <div className="input-field col s12">
            <input id="d-title" type="text"
              value={deleteTitle}
              onChange={e => setDeleteTitle(e.target.value)}
            />
            <label htmlFor="d-title">Ticket title</label>
          </div>

        </div>
      </form>

      <button className="btn reddish"
        onClick={() =>  {
          clearErrors()
          deleteTicket(currentTicket._id, deleteTitle)
        }}
      >Delete ticket</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    currentTicket: state.ticket.currentTicket,
    error: state.error
  }
}

export default connect(mapStateToProps, { clearErrors, deleteTicket })(DeleteTicket)
