import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'

const Sidebar = props => {

  return (
    <ul id="sidebar" className="sidenav sidenav-fixed sidenav-close">

      <li><Link to="/"><i className="material-icons">home</i>Dashboard</Link></li>

      { !props.isAuthenticated &&
      <li><Link to="/login"><i className="material-icons">vpn_key</i>Login</Link></li>}

      { !props.isAuthenticated &&
      <li><Link to="/register"><i className="material-icons">chrome_reader_mode</i>Register</Link></li>}

      <li><Link to="/profile"><i className="material-icons">person</i>Profile</Link></li>

      <li><Link to="/projects"><i className="material-icons">view_list</i>Projects</Link></li>

      { props.isAuthenticated &&
      <li><Link to="/" onClick={props.logout}><i className="material-icons">exit_to_app</i>Logout</Link></li>}

      <li><div className="divider"></div></li>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { logout })(Sidebar)
