import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import PageContainer from '../../layout/PageContainer'
import EditTicket from './EditTicket'
import DeleteTicket from './DeleteTicket'
import AllComments from '../comments/AllComments'
import NewComment from '../comments/NewComment'
import ExpandingModule from '../../bits/ExpandingModule'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCurrentTicket, removeCurrentTicket } from '../../../actions/ticketActions'
import { loadProjects } from '../../../actions/projectActions'

const TicketDetail = props => {

  const { getCurrentTicket, removeCurrentTicket, currentTicket, loadProjects,
    match:{params:{_id}}, history } = props

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentTicket) setIsLoading(false)
  }, [isLoading, currentTicket])

  // if deleted go to all tickets page
  useEffect(() => {
    if (currentTicket.isDeleted) {
      history.replace(`/tickets`)
    }
  }, [currentTicket, history])

  useEffect(() => {
    getCurrentTicket(_id)
    return () => removeCurrentTicket()
  }, [getCurrentTicket, _id, removeCurrentTicket])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  if (!currentTicket) return null

  const Return = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    & > * {
      margin: 0 5px;
    }
  `

  const BackIcon = styled.div`
    line-height: 16px;
    font-size: 20px;
    vertical-align: middle;
    margin-right: 4px;
  `

  const TicketAttribute = styled.div`
    border-top: 1px solid #ccc;
    padding-top: 3px !important;
    padding-bottom: 9px !important;
    margin-bottom: 5px;
    & > div {
      margin-left: 10px;
    }
  `

  const priorityToString = number => {
    switch(number) {
      case 1: return 'High'
      case 2: return 'Medium'
      case 3: return 'Low'
      default: return number
    }
  }

  return (
    <PageContainer>

      { currentTicket.project &&
      <Return>
        <Link to={`/projects/${currentTicket.project.slug}`}>
            <BackIcon className="material-icons">arrow_back</BackIcon>
        <span>View project</span></Link>
        <Link to="/tickets">
            <BackIcon className="material-icons">arrow_back</BackIcon>
        <span>All tickets</span></Link>
      </Return>}

      <div className="module full-width row">
        <div className="col s12"><h2>{currentTicket.title}</h2></div>
        <TicketAttribute className="col s12 m6">
          <h6>Submitter</h6>
          <div>{currentTicket.submitter ? currentTicket.submitter.name : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Description</h6>
          <div>{currentTicket.description ? currentTicket.description : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Project</h6>
          <div>{currentTicket.project ? currentTicket.project.name : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Status</h6>
          <div>{currentTicket.status ? currentTicket.status : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Ticket type</h6>
          <div>{currentTicket.ticketType ? currentTicket.ticketType : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Priority</h6>
          <div>{currentTicket.priority ? priorityToString(currentTicket.priority) : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Last updated</h6>
          <div>{currentTicket.last_updated ? <Moment date={currentTicket.last_updated} format="DD MMM YYYY HH:mm"/> : '---'}</div>
        </TicketAttribute>
        <TicketAttribute className="col s12 m6">
          <h6>Created</h6>
          <div>{currentTicket.creation_date ? <Moment date={currentTicket.creation_date} format="DD MMM YYYY HH:mm"/> : '---'}</div>
        </TicketAttribute>
      </div>

      <ExpandingModule title="Edit ticket details" icon="edit" color="#67d8cd">
        <EditTicket />
      </ExpandingModule>

      <ExpandingModule title="Delete ticket" icon="delete_forever" color="#d66853">
          <DeleteTicket />
      </ExpandingModule>

      <PageContainer title="Comments" small>
        <ExpandingModule title="Post a new comment" icon="comment" color="#67d8cd">
          <NewComment />
        </ExpandingModule>
        <AllComments />
      </PageContainer>

    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    currentTicket: state.ticket.currentTicket,
    projects: state.project.projects
  }
}

export default connect(mapStateToProps, { getCurrentTicket, removeCurrentTicket, loadProjects })(TicketDetail)
