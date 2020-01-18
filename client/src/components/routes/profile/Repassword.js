import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Fade from '../../bits/Fade'
import Notification from '../../bits/Notification'
import FormInstructions from '../../bits/FormInstructions'
import ErrorMessage from '../../bits/ErrorMessage'
import { connect } from 'react-redux'
import { repassword } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

const Repassword = props => {

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [successfulRepassword,  setSuccessfulRepassword] = useState(false)
  const [msg, setMsg] = useState("")

  const { error, repassword, clearErrors } = props

  // Error state
  useEffect(() => {
    if (error.id === 'REPASSWORD_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  const onSubmit = () => {
    repassword(currentPassword, newPassword)
  }

  const instructions = [
    'Enter your current password and a new password to update it.',
    'Your password must be at least 8 characters long.'
  ]

  return (
    <div className="module">
      <h2>Change password</h2>
      <Fade show={successfulRepassword}>
        <Notification message={"Password updated"} bg={"success"}/>
      </Fade>
      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="currentPassword" type="password" className="validate"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <label htmlFor="currentPassword">Current password</label>
          </div>
          <div className="input-field col s12">
            <input id="newPassword" type="password" className="validate"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <label htmlFor="newPassword">New password</label>
          </div>
        </div>
      </form>

      <button className="btn greenish"
        onClick={onSubmit}
      >Update password</button>

    </div>
  )
}

Repassword.propTypes = {
  error: PropTypes.object.isRequired,
  repassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps, { repassword, clearErrors })(Repassword)
