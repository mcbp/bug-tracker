import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

const DemoLogin = props => {

  const { login } = props

  const email = "demouser@example.com"
  const password = "notRealPassword"

  const onSubmit = () => {
    login({email, password})
  }

  return (
    <button className="btn greenish" style={{marginLeft: "10px"}}
      onClick={onSubmit}
    >
      Demo login
    </button>
  )
}

export default connect(null, { login })(DemoLogin)
