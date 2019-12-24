import React from "react"
import PageContainer from '../../layout/PageContainer'
import Rename from './Rename'
import Repassword from './Repassword'
import { connect } from 'react-redux'
import { rename } from '../../../actions/authActions'

const Profile = props => {

  const { name } = props

  return (
    <PageContainer title={name + "'s profile"}>

      <Rename />
      <Repassword />

    </PageContainer>
  )
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name
  }
}

export default connect(mapStateToProps, { rename })(Profile)
