import React, { useState, useEffect, useRef } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'
import Table from '../../bits/Table'
import { connect } from 'react-redux'
import { loadTickets, clearTickets } from '../../../actions/ticketActions'
import { loadProjects } from '../../../actions/projectActions'

const AllTickets = props => {

    const { loadTickets, clearTickets, tickets, isLoading,
      loadProjects, projects, projectFilter, showProject,
      showSearch, statusFilter, showStatus, headerColor } = props

    const [currentProjectFilter, setCurrentProjectFilter] = useState(projectFilter)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentStatusFilter, setCurrentStatusFilter] = useState(statusFilter)

    useEffect(() => {
      loadTickets(currentProjectFilter, searchQuery, currentStatusFilter)
      return () => clearTickets()
    }, [loadTickets, currentProjectFilter, searchQuery, currentStatusFilter, clearTickets])

    useEffect(() => {
      loadProjects()
    }, [loadProjects])

    const projectSelect = useRef(null)
    const statusSelect = useRef(null)
    useEffect(() => {
      M.FormSelect.init(projectSelect.current)
      M.FormSelect.init(statusSelect.current)
    }, [tickets, projects])

    const filterComponent = (
      <div className = "input-field col s12 m6" >
        <select ref={projectSelect} onChange={e => setCurrentProjectFilter(e.target.value)}>
          <option value="">All Projects</option>
            {projects.map(
              ({_id, name}) => <option key={_id} value={_id}>{name}</option>)}
        </select>
        <label>Filter by project</label>
      </div>
    )

    const searchComponent = (
      <div className="input-field col s12 m6">
        <i className = "material-icons icon-suffix">search</i>
        <input id="search" type="text" placeholder="" onChange={e => setSearchQuery(e.target.value)}/>
        <label htmlFor="search">Search tickets</label>
      </div>
    )

    const statusComponent = (
      <div className = "input-field col s12 m6" >
        <select ref={statusSelect} onChange={e => setCurrentStatusFilter(e.target.value)}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
          <option value="">All Status</option>
        </select>
        <label>Filter by status</label>
      </div>
    )

    return (
      <div className="row" style={{overflowX: "auto", overflowY: "hidden", margin: "-5px", padding: "5px", minHeight: "300px"}}>
        {showProject && filterComponent}
        {showSearch && searchComponent}
        {showStatus && statusComponent}
        <Table
          isLoading={isLoading}
          headings={['Ticket', 'Project', 'Type', 'Status', 'Last updated', '']}
          data={tickets.map(
            ({title, project: {name}, ticketType, status, last_updated, _id}) =>
            ({title, name, ticketType, status, last_updated, slug: _id}))}
          slugPrefix={"/tickets/"}
          headerColor={headerColor}
        />
      </div>
    )
  }

  const mapStateToProps = state => {
    return {
      isLoading: state.ticket.isLoading,
      tickets: state.ticket.tickets,
      projects: state.project.projects
    }
  }

  export default connect(mapStateToProps, { loadTickets, clearTickets, loadProjects })(AllTickets)
