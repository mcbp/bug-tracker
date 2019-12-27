import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PageContainer from '../../layout/PageContainer'
import TicketHome from './TicketHome'

const Ticket = props => {
  return (
    <Switch>
      <Route exact path='/tickets' component={TicketHome}/>
      <Route path='/tickets/:slug' component={""}/>
    </Switch>
  )
}

export default Ticket
