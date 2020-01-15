import React, { Fragment, useState, useEffect } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import FormInstructions from '../../bits/FormInstructions'
import { connect } from 'react-redux'
import { createProject } from '../../../actions/projectActions'
import { clearErrors } from '../../../actions/errorActions'

const NewProject = props => {

  const { error, createProject, clearErrors } = props

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [msg, setMsg] = useState("")

  // Error state
  useEffect(() => {
    if (error.id === 'CREATE_PROJECT_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const instructions = [
    'Create a new project. Tickets can be assigned to individual projects.'
  ]

  return (
    <Fragment>

      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 green-from">

        <div className="input-field col s12">
          <input id="name" type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="name">Project name</label>
        </div>

        <div className="input-field col s12">
          <input id="description" type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label htmlFor="description">Project description</label>
        </div>

      </form>

      <button className="btn greenish"
        onClick={() =>  {
          clearErrors()
          createProject(name, description)
        }}
      >Create project</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps, { createProject, clearErrors })(NewProject)
