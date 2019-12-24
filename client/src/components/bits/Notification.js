import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Notification = ({className, message, bg}) => {

  const Note = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 8px 15px;
    margin: 10px;
    background-color: ${() => {
      if (bg === 'success') return '#5ccf88'
      if (bg === 'failure') return '#ca054d'
      else return '#aaa'
    }};
    color: #fff;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  `
  return (
    <Note className={className}>
      <i style={{marginRight: "8px"}} className="material-icons">check</i>
      { message }
    </Note>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  bg: PropTypes.string
}

export default Notification
