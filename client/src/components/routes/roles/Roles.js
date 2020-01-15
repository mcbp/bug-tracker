import React, { useEffect } from 'react'
import PageContainer from '../../layout/PageContainer'
import FadeInTransition from '../../bits/FadeInTransition'
import UserList from './UserList'
import RoleForm from './RoleForm'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { clearUser } from '../../../actions/roleActions'

const Roles = props => {

  const { clearUser } = props

  useEffect(() => {
    return () => clearUser()
  }, [clearUser])

  const Overflow = styled.div`
    overflow-x: auto;
    margin: -5px;
    padding: 5px;
  `

  return (
    <FadeInTransition>
      <PageContainer title="Role Management">
        <div className="row" style={{margin: "-0.75rem", marginTop: "30px"}}>

          <div className="col s12 m12 l12 xl4">
            <div className="module full-width">
              <RoleForm />
            </div>
          </div>

          <div className="col s12 m12 l12 xl8">
            <Overflow>
              <UserList />
            </Overflow>
          </div>

        </div>
      </PageContainer>
    </FadeInTransition>
  )
}

export default connect(null, { clearUser })(Roles)
