import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom"
import { connect } from 'react-redux'

const GlobalNotification = props => {

  const { notifications } = props

  const containerStyle = {
    position: "fixed",
    bottom: "90vh",
    right: 0,
    left: 0,
    top: "90vh",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    justifyContent: "flex-end",
    alignItems: "center",
  }

  const Notification = styled.div`
    background-color: #3590f3;
    color: #fff;
    z-index: 999;
    width: 250px;
    margin: 15px 0;
    flex: 0 0 100px;
    position: relative;
    border-radius: 2px;
    display: flex;
    align-items: center;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    & i {
      background-color: #2c76c7;
      padding: 10px;
    }
    & span {
       margin: 0 10px;
    }
  `

  return (
    <Fragment>
      <ul className="notification-container" style={containerStyle}>
        <AnimatePresence initial={false}>
          {notifications.map((note, id) => (
            <motion.li
              key={id}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <Notification>
                <i className="material-icons">check</i>
                <span>{note}</span>
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
