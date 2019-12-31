import React, { useEffect } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { loadUser } from './actions/authActions'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import PrivateRoute from './components/routes/PrivateRoute'
import Dashboard from './components/routes/Dashboard'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import Profile from './components/routes/profile/Profile'
import Project from './components/routes/projects/Project'
import Ticket from './components/routes/tickets/Ticket'
import Footer from './components/layout/Footer'

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
  const { loadUser } = props

  useEffect(() => {
    M.AutoInit()
    loadUser()
  }, [loadUser])

  return (
    <Router>

      <Header>
        <Navbar />
        <Sidebar />
      </Header>

      <Main>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <Route path="/projects" component={Project}/>
            <Route path="/tickets" component={Ticket}/>
          </Switch>
        </div>
      </Main>

      <Footer />

    </Router>
  )
}

export default connect(null, { loadUser })(App)
