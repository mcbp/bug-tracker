import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PageContainer from '../../layout/PageContainer'
import EditProject from './EditProject'
import DeleteProject from './DeleteProject'
import ExpandingModule from '../../bits/ExpandingModule'
import AllTickets from '../tickets/AllTickets'
import NewTicket from '../tickets/NewTicket'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCurrentProject, removeCurrentProject } from '../../../actions/projectActions'

const ProjectDetail = props => {

  const { getCurrentProject, currentProject, removeCurrentProject,
    match:{params:{slug}} } = props

  const [isLoading, setIsLoading] = useState(true)

  const Description = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    & > * {
      padding: 5px 0;
    }
  `
  const BackIcon = styled.div`
    line-height: 16px;
    font-size: 20px;
    vertical-align: middle;
    margin-right: 4px;
  `

  useEffect(() => {
    if (currentProject) setIsLoading(false)
  }, [isLoading, currentProject])

  useEffect(() => {
    getCurrentProject(slug)
    return () => removeCurrentProject()
  }, [getCurrentProject, slug, removeCurrentProject])

  // if slug updates change url
  useEffect(() => {
    if (currentProject.slug && currentProject.slug !== slug) {
      props.history.replace(`/projects/${currentProject.slug}`)
    }
    if (currentProject.isDeleted) {
      props.history.replace(`/projects`)
    }
  }, [slug, currentProject])

  if (!currentProject) return null

  if (currentProject.error) return (
    <PageContainer title={"404 Not found"}>
      <div>{currentProject.error}</div>
    </PageContainer>
  )

  return (
    <PageContainer title={currentProject.name}>
      <Description>
        <div>{currentProject.description}</div>
        <Link to="/projects/">
            <BackIcon className="material-icons">arrow_back</BackIcon>
        <span>Back to projects</span></Link>
      </Description>

      <ExpandingModule title="Edit project details" icon="edit" color="#67d8cd">
        <EditProject />
      </ExpandingModule>

      <ExpandingModule title="Delete project" icon="delete_forever" color="#d66853">
        <DeleteProject />
      </ExpandingModule>

      <Description>
        <div>Last updated: <Moment date={currentProject.last_updated} format="DD MMM YYYY HH:mm"/></div>
        <div>Created: <Moment date={currentProject.creation_date} format="DD MMM YYYY HH:mm"/></div>
      </Description>

      <PageContainer title={"Tickets for this project"} small>
        <ExpandingModule title="Create a new ticket" icon="note_add" color="#67d8cd">
          <NewTicket lockProject={currentProject}/>
        </ExpandingModule>
        <AllTickets
          projectFilter={currentProject._id}
          showSearch
          headerColor={'#b886f4'}
        />
      </PageContainer>

    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    currentProject: state.project.currentProject
  }
}

export default connect(mapStateToProps, { getCurrentProject, removeCurrentProject })(ProjectDetail)
