import React, { useEffect } from 'react'
import NewProject from './NewProject'
import PageContainer from '../../layout/PageContainer'
import ExpandingModule from '../../bits/ExpandingModule'
import Table from '../../bits/Table'
import { connect } from 'react-redux'
import { loadProjects, createProject } from '../../../actions/projectActions'

const AllProjects = props => {

  const { loadProjects, createProject, projects } = props

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <PageContainer title="Projects">
      <ExpandingModule title="Create a new project" icon="add_circle_outline" color="#67d8cd">
        <NewProject/>
      </ExpandingModule>
      <Table
        headings={["Project", "Description", ""]}
        data={projects.map(({name, description, slug}) => ({name, description, slug}))}
        slugPrefix="/projects/"
      />
    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.project.isLoading,
    projects: state.project.projects
  }
}

export default connect(mapStateToProps, { loadProjects })(AllProjects)
