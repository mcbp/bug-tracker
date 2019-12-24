import React, { useEffect } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { loadUser } from './actions/authActions'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import PrivateRoute from './components/routes/PrivateRoute'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import Profile from './components/routes/profile/Profile'

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
            <Route exact path="/">
              home
            </Route>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/profile" component={Profile}/>
          </Switch>
        </div>
      </Main>

    </Router>
  )
}

export default connect(null, { loadUser })(App)
