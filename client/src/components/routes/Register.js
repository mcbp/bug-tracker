import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageContainer from '../layout/PageContainer'
import FormInstructions from '../bits/FormInstructions'
import ErrorMessage from '../bits/ErrorMessage'
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const Register = props => {

  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { name, email, password } = registerState
  const [errorState, setErrorState] = useState({msg: ""})
  const { msg } = errorState

  const { error, isAuthenticated } = props
  const history = useHistory()

  // Error state
  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setErrorState({msg: error.msg})
    } else {
      setErrorState({msg: ""})
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [])

  // Auth state
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])

  const onSubmit = () => {
    const newUser = {
      name, email, password
    }
    props.register(newUser)
    setRegisterState({...registerState, name: "", email: "", password: ""})
  }

  const instructions = [
    'Name can only contain letters, numbers, dashes and underscores.',
    'Password must be at least 8 characters.'
  ]

  return (
    <PageContainer title="Registration">
      <div className="module">

        { !msg ? <FormInstructions instructions={instructions}/> : <ErrorMessage msg={msg} />}
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="name" type="text" className="validate"
                value={name}
                onChange={e => setRegisterState({...registerState, name: e.target.value})}
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate"
                value={email}
                onChange={e => setRegisterState({...registerState, email: e.target.value})}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate"
                value={password}
                onChange={e => setRegisterState({...registerState, password: e.target.value})}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </form>

        <button className="btn"
          onClick={onSubmit}
        >Sign up</button>

      </div>
    </PageContainer>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

export default connect(mapStateToProps, { register, clearErrors })(Register)
