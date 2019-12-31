import React, { Fragment, useState, useEffect } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import FormInstructions from '../../bits/FormInstructions'
import { connect } from 'react-redux'
import { deleteProject } from '../../../actions/projectActions'
import { clearErrors } from '../../../actions/errorActions'

const DeleteProject = props => {

  const { error, deleteProject, clearErrors, currentProject } = props

  const [deleteName, setDeleteName] = useState("")
  const [msg, setMsg] = useState("")

  // Error state
  useEffect(() => {
    if (error.id === 'DELETE_PROJECT_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg()
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const instructions = [
    `WARNING: Deleting a project will delete all associated tickets - this cannot be undone.
    Please type the current project name to confirm the deletion.`
  ]

  return (
    <Fragment>

      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12">

        <div className="input-field col s12">
          <input id="deleteName" type="text" className="validate"
            value={deleteName}
            onChange={e => setDeleteName(e.target.value)}
          />
          <label htmlFor="deleteName">Project name</label>
        </div>

      </form>

      <button className="btn reddish"
        onClick={() => {
          clearErrors()
          deleteProject(currentProject._id, deleteName)
        }}
      >Delete project</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    currentProject: state.project.currentProject,
    error: state.error
  }
}

export default connect(mapStateToProps, { deleteProject, clearErrors })(DeleteProject)
