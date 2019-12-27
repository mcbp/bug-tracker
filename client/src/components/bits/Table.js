import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'react-uuid'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = props => {

  const { headings, data, slugPrefix, headerColor } = props

  const TableContainer = styled.table`
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 2px;
    width: 100%;
  `
  const Thead = styled.thead`
    background-color: ${headerColor ? headerColor : '#67c688'};
    color: #fff;
  `
  const Th = styled.th`
    font-family: 'Alata';
    font-size: 18px;
    font-weight: normal;
    padding: 15px;
  `
  const Td = styled.td`
    padding: 15px;
  `
  const Empty = styled.td`
    padding: 15px;
    text-align: center;
  `

  return (
    <TableContainer className="striped">

      <Thead>
        <tr>
          {headings.map(head => <Th key={uuid()}>{head}</Th>)}
        </tr>
      </Thead>

      <tbody>
        { data.length > 0 ?
          data.map(row =>
            <tr>
              {Object.keys(row).map(col => {
                if (col === "slug") {
                  return (<Td key={uuid()}>
                    <Link to={`${slugPrefix}${row.slug}`}>
                      View <i style={{verticalAlign: "middle"}} className="material-icons">keyboard_arrow_right</i>
                    </Link>
                  </Td>)
                }
                else {
                  return <Td key={uuid()}>{row[col]}</Td>
                }
              })}
            </tr>
          )
        : <tr><Empty colSpan={"100%"}>No results found</Empty></tr>}
      </tbody>

    </TableContainer>
  )

}

Table.propTypes = {
  headings: PropTypes.array,
  data: PropTypes.array
}

export default Table
