import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uuid from 'react-uuid'
import Moment from 'react-moment'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = props => {

  const { isLoading, headings, data, slugPrefix, headerColor } = props

  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    let timer
    if (!data.length) {
      setShowLoading(true)
      timer = setTimeout(() => setShowLoading(false), 750)
    }
    return () => clearTimeout(timer)
  }, [isLoading, data])

  const TableContainer = styled.table`
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 2px;
    width: 100%;
    & thead {
      background-color: ${headerColor ? headerColor : '#67c688'};
      color: #fff;
    }
    & th {
      font-family: 'Alata';
      font-size: 18px;
      font-weight: normal;
      padding: 15px;
    }
    & td {
      padding: 15px;
    }
    & td.empty {
      text-align: center;
    }
  `

  const variants = {
    initial: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  return (
    <TableContainer className="striped">

      <thead>
        <tr>
          {headings.map(head => <th key={uuid()}>{head}</th>)}
        </tr>
      </thead>

      <AnimatePresence exitBeforeEnter>
        <motion.tbody
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          { data.length ?
            data.map(row =>
              <motion.tr
                key={uuid()}
                variants={variants}
              >
                {Object.keys(row).map(col => {
                  if (col === "slug") {
                    return (
                      <td key={uuid()}>
                        <Link to={`${slugPrefix}${row.slug}`}>
                          View <i style={{verticalAlign: "middle"}} className="material-icons">keyboard_arrow_right</i>
                        </Link>
                      </td>
                    )
                  }
                  else if (col ==="last_updated") {
                    return (
                      <td key={uuid()}>
                        <Moment date={row[col]} format="DD/MM/YY HH:mm"/>
                      </td>
                    )
                  }
                  else {
                    return <td key={uuid()}>{row[col]}</td>
                  }
                })}
              </motion.tr>
            )
          : <motion.tr
              key={uuid()}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <td className="empty" colSpan={"100%"}>
                <h6>{isLoading || showLoading ? 'loading...' : 'No results found'}</h6>
              </td>
            </motion.tr>
          }
        </motion.tbody>
      </AnimatePresence>


    </TableContainer>
  )

}

Table.propTypes = {
  headings: PropTypes.array,
  data: PropTypes.array
}

export default Table
