import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PageContainer from '../../layout/PageContainer'
import FadeInTransition from '../../bits/FadeInTransition'
import TicketHome from './TicketHome'
import TicketDetail from './TicketDetail'

const Ticket = props => {

  return (
    <FadeInTransition>
      <Switch>
        <Route exact path='/tickets' component={TicketHome}/>
        <Route path='/tickets/:_id' component={TicketDetail}/>
      </Switch>
    </FadeInTransition>
  )
}

export default Ticket
