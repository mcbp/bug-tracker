import React from 'react'
import PageContainer from '../../layout/PageContainer'
import AllTickets from './AllTickets'

const TicketHome = props => {
  return (
    <PageContainer title="Tickets">
      <AllTickets
        showFilter
        showSearch
        headerColor={'#b886f4'}
      />
    </PageContainer>
  )
}

export default TicketHome
