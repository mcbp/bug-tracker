import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper container">
        <a href="#" data-target="sidebar" className="top-nav sidenav-trigger full hide-on-large-only">
          <i className="material-icons">menu</i>
        </a>
        <a href="/" className="brand-logo">Bug Tracker</a>
      </div>
    </nav>
  )
}

export default Navbar
