import React, { useState, useEffect, useRef } from 'react'
import M from 'materialize-css'
import Table from '../../bits/Table'
import { connect } from 'react-redux'
import { loadTickets, clearTickets } from '../../../actions/ticketActions'
import { loadProjects } from '../../../actions/projectActions'

const AllTickets = props => {

    const { loadTickets, clearTickets, tickets,
      loadProjects, projects,
      projectFilter, showFilter, showSearch, headerColor } = props

    const [currentProjectFilter, setCurrentProjectFilter] = useState(projectFilter)
    const [searchQuery, setSearchQuery] = useState()

    useEffect(() => {
      loadTickets(currentProjectFilter, searchQuery)
    }, [loadTickets, currentProjectFilter, searchQuery])

    useEffect(() => {
      return () => clearTickets()
    }, [clearTickets])

    useEffect(() => {
      loadProjects()
    }, [loadProjects])

    const select = useRef(null)
    useEffect(() => {
      const elem = select.current
      M.FormSelect.init(elem)
    }, [tickets, projects])

    const filterComponent = (
      <div className = "input-field col s12 m6" >
        <select ref={select} onChange={e => setCurrentProjectFilter(e.target.value)}>
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

    return (
      <div className="row">
        {showFilter && filterComponent}
        {showSearch && searchComponent}
        <Table
          headings={['Ticket', 'Project', 'Status', 'Last updated', '']}
          data={tickets.map(
            ({title, project: {name}, status, last_updated, _id}) =>
            ({title, name, status, last_updated, slug: _id}))}
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
