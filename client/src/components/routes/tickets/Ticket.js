import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PageContainer from '../../layout/PageContainer'
import AllTickets from './AllTickets'

const Ticket = props => {
  return (
    <Switch>
      <PageContainer title="Tickets">
        <Route exact path='/tickets' component={AllTickets}/>
      </PageContainer>
      <Route path='/tickets/:slug' component={""}/>
    </Switch>
  )
}

export default Ticket
