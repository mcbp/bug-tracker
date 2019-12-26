import React, { useState, useEffect } from 'react'
import PageContainer from '../../layout/PageContainer'
import EditProject from './EditProject'
import DeleteProject from './DeleteProject'
import ExpandingModule from '../../bits/ExpandingModule'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCurrentProject, removeCurrentProject } from '../../../actions/projectActions'

const ProjectDetail = props => {

  const { getCurrentProject, currentProject, removeCurrentProject,
    match:{params:{slug}} } = props

  const Description = styled.div`
    margin-bottom: 30px;
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  `

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

  if (currentProject.error) return (
    <PageContainer title={"404 Not found"}>
      <div>{currentProject.error}</div>
    </PageContainer>
  )

  return (
    <PageContainer title={currentProject.name}>
      <Description>{currentProject.description}</Description>

      <ExpandingModule title="Edit project details" icon="edit" color="#67d8cd">
        <EditProject />
      </ExpandingModule>

      <ExpandingModule title="Delete project" icon="delete_forever" color="#d66853">
        <DeleteProject />
      </ExpandingModule>

    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    currentProject: state.project.currentProject
  }
}

export default connect(mapStateToProps, { getCurrentProject, removeCurrentProject })(ProjectDetail)
