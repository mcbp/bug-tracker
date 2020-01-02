import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loadUsers, selectUser } from '../../../actions/roleActions'

const UserList = props => {

  const { loadUsers, selectUser, users, selectedUser } = props

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

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
      background-color: #67c688;
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
  )
}

const mapStateToProps = state => {
  return {
    users: state.role.users,
    selectedUser: state.role.selectedUser
  }
}

export default connect(mapStateToProps, { loadUsers, selectUser })(UserList)
