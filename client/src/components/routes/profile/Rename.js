import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Fade from '../../bits/Fade'
import Notification from '../../bits/Notification'
import FormInstructions from '../../bits/FormInstructions'
import ErrorMessage from '../../bits/ErrorMessage'
import { connect } from 'react-redux'
import { rename } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

const Rename = props => {
  const [renameState, setRenameState] = useState({name: ""})
  const { name } = renameState

  const [errorState, setErrorState] = useState({msg: ""})
  const { msg } = errorState

  const [successfulRename, setSuccessfulRename] = useState(false)

  const { error, storeName, rename, clearErrors } = props

  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      clearErrors()
      setSuccessfulRename(true)
      let timer = setTimeout(() => setSuccessfulRename(false), 3000)
      return () => clearTimeout(timer)
    } else didMountRef.current = true
  }, [storeName, clearErrors])

  // Error state
  useEffect(() => {
    if (error.id === 'RENAME_FAIL') {
      setErrorState({msg: error.msg})
    } else {
      setErrorState({msg: ""})
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const onSubmit = () => {
    rename(renameState)
    setRenameState({name: ""})
  }

  const instructions = [
    'Enter a new name to update your username.'
  ]

  return (
    <div className="module">
      <h2>Change name</h2>
      <Fade show={successfulRename}>
        <Notification message={"Name updated"} bg={"success"}/>
      </Fade>
      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="name" type="text" className="validate"
              value={name}
              onChange={e => setRenameState({name: e.target.value})}
            />
            <label htmlFor="name">New name</label>
          </div>
        </div>
      </form>

      <button className="btn greenish"
        onClick={onSubmit}
      >Update name</button>

    </div>
  )
}

Rename.propTypes = {
  error: PropTypes.object.isRequired,
  storeName: PropTypes.string.isRequired,
  rename: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    error: state.error,
    storeName: state.auth.user.name
  }
}

export default connect(mapStateToProps, { rename, clearErrors })(Rename)
