import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Welcome = ({showPopUp}) => {

  const [isOpen, setIsOpen] = useState(true)

  if (!showPopUp) return null

  const Container = styled(motion.div)`
    position: fixed;
    background-color: rgba(0,0,0,0.4);
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    & .module {
      width: 85%;
      margin-top: 200px;
    }
    & .modal-content {
      border-top: 1px solid #9e9e9e;
    }
    & .modal-content button {
      margin-top: 15px;
      float: right;
    }
  `

  return (
    <AnimatePresence>
    { isOpen &&
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="module"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <h2>Bug Tracker Demo</h2>
          <div className="modal-content">
            <p>Welcome to the demo of my bug management web application.</p>
            <p>Features include issue capturing and tracking, multiple project support, JWT based authentication, and user role management.</p>
            <p>Most functionality is secured behind login, however a demo login is available if you do not want to create an account.</p>
            <button className="btn greenish" onClick={() => setIsOpen(false)}>Okay</button>
          </div>
        </motion.div>
      </Container>
      }
    </AnimatePresence>
  )
}

export default Welcome
