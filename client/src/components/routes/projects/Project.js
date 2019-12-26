import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllProjects from './AllProjects'
import ProjectDetail from './ProjectDetail'

const Project = props => {
  return (
    <Switch>
      <Route exact path='/projects' component={AllProjects}/>
      <Route path='/projects/:slug' component={ProjectDetail}/>
    </Switch>
  )
}

export default Project
