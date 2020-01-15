import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FadeInTransition from '../../bits/FadeInTransition'
import AllProjects from './AllProjects'
import ProjectDetail from './ProjectDetail'

const Project = props => {
  return (
    <FadeInTransition>
      <Switch>
        <Route exact path='/projects' component={AllProjects}/>
        <Route path='/projects/:slug' component={ProjectDetail}/>
      </Switch>
    </FadeInTransition>
  )
}

export default Project
