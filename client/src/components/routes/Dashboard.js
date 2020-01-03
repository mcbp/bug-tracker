import React from 'react'
import PageContainer from '../layout/PageContainer'
import TicketsByPriority from './dashboard/TicketsByPriority'
import TicketsByType from './dashboard/TicketsByType'
import TicketsByStatus from './dashboard/TicketsByStatus'
import TicketsByLatest from './dashboard/TicketsByLatest'
import styled from 'styled-components'

const Dashboard = props => {

  // Graphs
  // tickets by prioirty - done
  // tickets by type - done
  // tikcets by status

  const ChartContainer = styled.div`
    text-align: center;
    & > h5 { margin: 0; }
  `

  return (
    <PageContainer title="Dashboard">
      <div className="row flex" style={{margin: "-0.75rem", marginTop: "30px"}}>

        <ChartContainer className="col s12 m12 l12 xl6">
          <div className="module full-width" style={{marginBottom: "1.5rem"}}>
            <TicketsByPriority />
            <h5>Tickets by priority</h5>
          </div>
        </ChartContainer>

        <ChartContainer className="col s12 m12 l12 xl6">
          <div className="module full-width" style={{marginBottom: "1.5rem"}}>
            <TicketsByType />
            <h5>Tickets by types</h5>
          </div>
        </ChartContainer>

        <ChartContainer className="col s12 m12 l12 xl6">
          <div className="module full-width" style={{marginBottom: "1.5rem"}}>
            <TicketsByStatus />
            <h5>Tickets by status</h5>
          </div>
        </ChartContainer>

        <ChartContainer className="col s12 m12 l12 xl6">
          <div className="module full-width" style={{marginBottom: "1.5rem"}}>
            <TicketsByLatest />
            <h5>Latest tickets</h5>
          </div>
        </ChartContainer>

      </div>
    </PageContainer>
  )
}

export default Dashboard
