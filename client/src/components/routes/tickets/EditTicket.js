import React, { useState, useEffect, useRef, Fragment } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import FormInstructions from '../../bits/FormInstructions'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { editTicket } from '../../../actions/ticketActions'
import { clearErrors } from '../../../actions/errorActions'

const EditTicket = props => {

  const { tickets, projects, error,
    clearErrors, editTicket, currentTicket } = props

  const [title, setTitle] = useState("")
  const [project, setProject] = useState("")
  const [description, setDescription] = useState("")
  const [ticketType, setTicketType] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (error.id === 'EDIT_TICKET_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])

  const projectSelect = useRef(null)
  useEffect(() => {
    const elem = projectSelect.current
    M.FormSelect.init(elem)
  }, [projects])

  const statusSelect = useRef(null)
  useEffect(() => {
    const elem = statusSelect.current
    M.FormSelect.init(elem)
  }, [])

  const ticketTypeSelect = useRef(null)
  useEffect(() => {
    const elem = ticketTypeSelect.current
    M.FormSelect.init(elem)
  }, [])

  const prioritySelect = useRef(null)
  useEffect(() => {
    const elem = prioritySelect.current
    M.FormSelect.init(elem)
  }, [])

  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const instructions = [
    'Edit the current ticket. Leaving fields blank will keep the current value the same.'
  ]

  return (
    <Fragment>

      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 purple-form">
        <div className="row">

          <div className="input-field col s12 m6">
            <input id="t-name" type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label htmlFor="t-name">Ticket title</label>
          </div>

          <div className="input-field col s12 m6">
            <input id="t-description" type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label htmlFor="t-description">Description</label>
          </div>

          <div className="input-field col s12 m6">
            <select ref={projectSelect} onChange={e => setProject(e.target.value)}>
              <option value="" disabled selected>Update project</option>
              {projects.map(({_id, name}) => <option key={_id} value={_id}>{name}</option>)}
            </select>
            <label>Project</label>
          </div>

          <div className="input-field col s12 m6">
            <select ref={statusSelect} onChange={e => setStatus(e.target.value)}>
              <option value="" disabled selected>Update status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <label>Status</label>
          </div>

          <div className="input-field col s12 m6">
            <select ref={ticketTypeSelect} onChange={e => setTicketType(e.target.value)}>
              <option value="" disabled selected>Update ticket type</option>
              <option value="Bugs/Errors">Bugs/Errors</option>
              <option value="Feature Requests">Feature Requests</option>
              <option value="Comments/Misc">Comments/Misc</option>
            </select>
            <label>Ticket type</label>
          </div>

          <div className="input-field col s12 m6">
            <select ref={prioritySelect} onChange={e => setPriority(e.target.value)}>
              <option value="" disabled selected>Update priority</option>
              <option value={3}>Low</option>
              <option value={2}>Medium</option>
              <option value={1}>High</option>
            </select>
            <label>Priority</label>
          </div>

        </div>
      </form>

      <button className="btn purp"
        onClick={() =>  {
          clearErrors()
          editTicket(currentTicket._id, title, description, project, ticketType, priority, status)
        }}
      >Update ticket</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.ticket.isLoading,
    currentTicket: state.ticket.currentTicket,
    projects: state.project.projects,
    error: state.error
  }
}

export default connect(mapStateToProps, { clearErrors, editTicket })(EditTicket)
