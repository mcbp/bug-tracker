import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loadUsers, selectUser } from '../../../actions/roleActions'

const UserList = props => {

  const { loadUsers, selectUser, users, selectedUser } = props

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadUsers(searchQuery)
  }, [loadUsers, searchQuery])

  const list = users.map(user => {
    return (
      <tr
        onClick={() => selectUser(user)}
        className={selectedUser._id === user._id ? 'selected' : ''}
      >
        <td>{user.name}</td>
        <td>{user.email}</td><
        td>{user.isAdmin ? 'Admin' : 'User'}</td>
      </tr>
    )
  })

  const Table = styled.table`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    & thead {
      font-family: 'Alata';
      font-size: 18px;
      background-color: #16bac5;
      color: #fff;
    }
    & tbody > tr {
      cursor: pointer;
    }
    & td, th {
      padding: 15px;
      font-weight: normal;
    }
    & .selected {
      background-color: #3590f3 !important;
      color: #fff !important;
    }
  `

  return (
    <Fragment>
      <div className="input-field col s12 m12 l12 xl6">
        <i className = "material-icons icon-suffix">search</i>
        <input id="search" type="text" placeholder="" onChange={e => setSearchQuery(e.target.value)}/>
        <label htmlFor="search">Search users</label>
      </div>
      <Table className="striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    users: state.role.users,
    selectedUser: state.role.selectedUser
  }
}

export default connect(mapStateToProps, { loadUsers, selectUser })(UserList)
