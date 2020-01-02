import React, { useState, useEffect, useRef, Fragment } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import FormInstructions from '../../bits/FormInstructions'
import M from 'materialize-css'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { updateRole } from '../../../actions/roleActions'
import { clearErrors } from '../../../actions/errorActions'

const RoleForm = props => {

  const { clearErrors, error, selectedUser, updateRole } = props

  const [newRole, setNewRole] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (error.id === 'UPDATE_ROLE_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])

  const instructions = [
    `Select a user from the table and use this form to update their role.`
  ]

  const select = useRef(null)
  useEffect(() => {
    const elem = select.current
    M.FormSelect.init(elem)
  }, [])

  const FalseField = styled.div`
    margin-bottom: 1rem;
    & > div {
      min-height: 32px;
      margin-top: 6px;
      box-sizing: border-box;
      border-bottom: 1px solid #9e9e9e;
      font-size: 15px;
    }
  `

  return (
    <Fragment>

      <FormInstructions instructions={instructions}/>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 green-form">
        <div className="row">

          <FalseField className="col s12">
            <label>User</label>
            <div>{selectedUser.name}</div>
          </FalseField>

          <FalseField className="col s12">
            <label>Current role</label>
            <div>{selectedUser.name ? (selectedUser.isAdmin ? 'Admin' : 'User') : ' '}</div>
          </FalseField>

          <div className="input-field col s12">
            <select ref={select} onChange={e => setNewRole(e.target.value)}>
              <option value="" disabled selected>New role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <label>New role</label>
          </div>

        </div>
      </form>

      <button className="btn greenish"
        onClick={() =>  {
          clearErrors()
          updateRole(selectedUser._id, newRole)
        }}
      >Update role</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    selectedUser: state.role.selectedUser,
    error: state.error
  }
}

export default connect(mapStateToProps, { clearErrors, updateRole })(RoleForm)
