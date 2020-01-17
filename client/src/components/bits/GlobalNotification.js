import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom"
import { connect } from 'react-redux'

const GlobalNotification = props => {

  const { notifications } = props

  const containerStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    top: "10vh",
    height: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "column",
    margin: "0 20px"
  }

  const Notification = styled.div`
    font-family: 'Alata';
    font-size: 18px;
    background-color: #3590f3;
    height: 60px;
    color: #fff;
    z-index: 999;
    width: 300px;
    margin: 5px 0;
    flex: 0 0 100px;
    position: relative;
    border-radius: 2px;
    display: flex;
    align-items: center;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    & i {
      background-color: #2c76c7;
      padding: 18px 10px;
      height: 60px;
    }
    & span {
       margin: 0 15px;
    }
    &.success { background-color: #67c688; }
    &.success i { background-color: #55a370; }
    &.failure { background-color: #de363d; }
    &.failure i { background-color: #b62d32; }
  `

  const icon = theme => {
    switch(theme) {
      case "success":
        return "check"
      case "failure":
        return "error_outline"
      case "info":
      default:
        return "info_outline"
    }
  }

  return (
    <Fragment>
      <ul className="notification-container" style={containerStyle}>
        <AnimatePresence initial={false}>
          {notifications.map((note, id) => (
            <motion.li
              key={note.id}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <Notification className={note.theme}>
                <i className="material-icons">{icon(note.theme)}</i>
                <span>{note.notification}</span>
              </Notification>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    notifications: state.error.notifications
  }
}

export default connect(mapStateToProps)(GlobalNotification)
