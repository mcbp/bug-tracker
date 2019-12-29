import React, { useState, useEffect, useRef, Fragment } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { createTicket } from '../../../actions/ticketActions'
import { clearErrors } from '../../../actions/errorActions'

const NewTicket = props => {

  const { tickets, projects, submitter, error,
    clearErrors, createTicket } = props

  const [title, setTitle] = useState("")
  const [project, setProject] = useState("")
  const [description, setDescription] = useState("")
  const [ticketType, setTicketType] = useState("Bugs/Errors")
  const [priority, setPriority] = useState(3)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (error.id === 'CREATE_TICKET_FAIL') {
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

  return (
    <Fragment>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 purple-form">
        <div className="row">

          <div className="input-field col s6">
            <input id="t-name" type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label htmlFor="t-name">Ticket title</label>
          </div>
          <div className="input-field col s6">
            <select ref={projectSelect} onChange={e => setProject(e.target.value)}>
              <option value="" disabled selected>Choose a project</option>
              {projects.map(({_id, name}) => <option key={_id} value={_id}>{name}</option>)}
            </select>
            <label>Project</label>
          </div>

          <div className="input-field col s12">
            <input id="t-description" type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label htmlFor="t-description">Description</label>
          </div>

          <div className="input-field col s6">
            <select ref={ticketTypeSelect} onChange={e => setTicketType(e.target.value)}>
              <option value="Bugs/Errors">Bugs/Errors</option>
              <option value="Feature Requests">Feature Requests</option>
              <option value="Comments/Misc">Comments/Misc</option>
            </select>
            <label>Ticket type</label>
          </div>

          <div className="input-field col s6">
            <select ref={prioritySelect} onChange={e => setPriority(e.target.value)}>
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
          createTicket(title, description, submitter, project, ticketType, priority)
        }}
      >Create ticket</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    submitter: state.auth.user._id,
    isLoading: state.ticket.isLoading,
    tickets: state.ticket.tickets,
    projects: state.project.projects,
    error: state.error
  }
}

export default connect(mapStateToProps, { clearErrors, createTicket })(NewTicket)
