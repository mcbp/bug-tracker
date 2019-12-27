import React, { useEffect } from 'react'
import Table from '../../bits/Table'
import { connect } from 'react-redux'
import { loadTickets, clearTickets } from '../../../actions/ticketActions'

const AllTickets = props => {

  const { loadTickets, clearTickets, tickets, projectFilter } = props

  useEffect(() => {
    loadTickets(projectFilter)
  }, [loadTickets, projectFilter])

  useEffect(() => {
    return () => clearTickets()
  }, [clearTickets])

  return (
    <Table
      headings={['Ticket', 'Project', '']}
      data={tickets.map(({title, project: {name}, _id}) => ({title, name, slug: _id}))}
      slugPrefix={"/tickets/"}
    />
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.ticket.isLoading,
    tickets: state.ticket.tickets
  }
}

export default connect(mapStateToProps, { loadTickets, clearTickets })(AllTickets)
