import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../bits/LoadingSpinner'
import styled from 'styled-components'
import axios from 'axios'
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const TicketsByType = props => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/charts/tickets-by-type')
      .then(res => {
        res.data.map(data => {
          data['name'] = data['_id']
          delete data['_id']
          return data
        })
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const colors = ['#2157c4', '#dbbd11', '#6f9636']

  const LoadingContainer = styled.div`
    height: 300px;
  `

  if (isLoading) return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  )

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          isAnimationActive={false}
          data={isLoading ? null : data}
          cx="50%"
          cy="50%"
          outerRadius={95}
          label={entry => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer >
  )
}

export default TicketsByType
