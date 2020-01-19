import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = props => {

  const { user } = props

  const Name = styled.span`
    font-family: 'Alata';
    font-size: 18px;
    cursor: pointer;
    & a {
      all: unset;
    }
    & a:hover {
      all: unset;
    }
  `

  return (
    <nav>
      <div className="nav-wrapper container">
        <a href="/" data-target="sidebar" className="top-nav sidenav-trigger full hide-on-large-only">
          <i className="material-icons">menu</i>
        </a>
        <Link to="/" className="brand-logo">Bug Tracker</Link>

        { user &&
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>Welcome, <Name><Link to="/profile">{ user }</Link></Name></li>
        </ul>}

      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user.name
  }
}

export default connect(mapStateToProps)(Navbar)
