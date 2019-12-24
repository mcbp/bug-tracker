import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'

const ErrorMessage = props => {

  const ErrorContainer = styled.div`
    color: #d66853;
    margin-bottom: 15px;
  `
  const Error = styled.div`
    display: flex;
  `
  const Icon = styled.i`
    margin-right: 5px;
  `
  return (
    <ErrorContainer>
      {props.msg.map(msg => {
        return (
          <Error key={uuid()}>
            <Icon className="material-icons">error_outline</Icon>
          {msg}</Error>
        )
      })
      }
    </ErrorContainer>
  )
}

export default ErrorMessage
