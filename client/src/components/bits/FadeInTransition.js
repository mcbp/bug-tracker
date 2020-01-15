import React from 'react'
import { motion } from 'framer-motion'

const FadeInTransition = props => {

  const { children } = props

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -25
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: 25
    }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  return (
    <motion.div
      initial={"initial"}
      animate={"in"}
      exit={"out"}
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export default FadeInTransition
