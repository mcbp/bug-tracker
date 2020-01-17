import React, { useEffect, Fragment } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom"
import { connect } from 'react-redux'
import { loadUser } from './actions/authActions'
import { createNotification } from './actions/errorActions'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import PrivateRoute from './components/routes/PrivateRoute'
import Dashboard from './components/routes/Dashboard'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import Profile from './components/routes/profile/Profile'
import Project from './components/routes/projects/Project'
import Ticket from './components/routes/tickets/Ticket'
import Roles from './components/routes/roles/Roles'
import Footer from './components/layout/Footer'
import GlobalNotification from './components/bits/GlobalNotification'

const Header = styled.header`
  padding-left: 300px;
  @media (max-width: 992px) {
    padding-left: 0;
  }
`
const Main = styled.main`
  padding-left: 300px;
  @media (max-width: 992px) {
    padding-left: 0;
  }
  margin-bottom: 200px;
`

const App = props => {

  const { loadUser, createNotification } = props

  const location = useLocation()

  useEffect(() => {
    M.AutoInit()
    loadUser()
  }, [loadUser])

  return (
    <Fragment>

      <Header>
        <Navbar />
        <Sidebar />
      </Header>

      <Main>
        <div className="container">
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <Route path="/projects" component={Project}/>
              <Route path="/tickets" component={Ticket}/>
              <PrivateRoute path="/roles" component={Roles}/>
            </Switch>
          </AnimatePresence>
        </div>
      </Main>

      <GlobalNotification />

      <Footer />

    </Fragment>
  )
}

export default connect(null, { loadUser, createNotification })(App)
