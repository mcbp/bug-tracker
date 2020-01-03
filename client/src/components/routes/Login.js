import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageContainer from '../layout/PageContainer'
import ErrorMessage from '../bits/ErrorMessage'
import FormInstructions from '../bits/FormInstructions'
import DemoLogin from './DemoLogin'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const Login = props => {

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  })
  const { email, password } = loginState
  const [errorState, setErrorState] = useState({msg: ""})
  const { msg } = errorState

  const { error, isAuthenticated, clearErrors } = props
  const history = useHistory()

  // Error state
  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrorState({msg: error.msg})
    } else {
      setErrorState({msg: ""})
    }
  }, [error])
  // Clean up error state
  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  // Auth state
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])

  const onSubmit = () => {
    const user = {
      email, password
    }
    props.login(user)
    setLoginState({...loginState, email: "", password: ""})
  }

  const instructions = [
    `If you do not want sign up you can press the demo login button to log in to a demo account.`
  ]

  return (
    <PageContainer title="Login">
      <div className="module">

        <FormInstructions instructions={instructions}/>

        { msg && <ErrorMessage msg={msg} />}
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate"
                value={email}
                onChange={e => setLoginState({...loginState, email: e.target.value})}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="password" className="validate"
                value={password}
                onChange={e => setLoginState({...loginState, password: e.target.value})}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </form>

        <button className="btn"
          onClick={onSubmit}
        >Log In</button>

        <DemoLogin />

      </div>
    </PageContainer>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

export default connect(mapStateToProps, { login, clearErrors })(Login)
