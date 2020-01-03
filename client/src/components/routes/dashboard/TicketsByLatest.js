import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TicketsByLatest = props => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/charts/tickets-by-latest-update')
      .then(res => {
        setData(res.data)
        setIsLoading(false)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const Container = styled.div`
    width: 100%;
    height: 300px;
    overflow-y: auto;
  `
  const Table = styled.table`
    & thead {
      font-family: 'Alata';
      font-size: 18px;
    }
    & td, th {
      padding: 15px;
      font-weight: normal;
    }
  `

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Latest update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(ticket => {
            return (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td><Moment date={ticket.last_updated} format="DD MMM YYYY"/></td>
                <td>
                  <Link to={`/tickets/${ticket._id}`}>
                    View <i style={{verticalAlign: "middle"}} className="material-icons">keyboard_arrow_right</i>
                  </Link>
                </td>
              </tr>
            )
          })}
          <tr>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default TicketsByLatest
