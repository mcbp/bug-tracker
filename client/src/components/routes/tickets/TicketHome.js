import React, { useEffect } from 'react'
import PageContainer from '../../layout/PageContainer'
import AllTickets from './AllTickets'
import NewTicket from './NewTicket'
import ExpandingModule from '../../bits/ExpandingModule'
import { connect } from 'react-redux'

const TicketHome = props => {

  const { tickets } = props

  // Reset NewTicket form if a new ticket is added to state
  useEffect(() => {}, [tickets])

  return (
    <PageContainer title="Tickets">
      <ExpandingModule title="Create a new ticket" icon="note_add">
        <NewTicket />
      </ExpandingModule>
      <AllTickets
        showProject
        showSearch
        showStatus
        statusFilter={"Open"}
        headerColor={'#b886f4'}
      />
    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    tickets: state.ticket.tickets
  }
}

export default connect(mapStateToProps)(TicketHome)
