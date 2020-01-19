import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ResponsiveContainer, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TicketsByStatus = props => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/charts/tickets-by-status')
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const dummyData = [
    { _id: 'Open', count: 0 },
    { _id: 'In Progress', count: 0 },
    { _id: 'Closed', count: 0 }
  ]

  const colors = ["#19c8a3", "#00a896", "#027583", '#05668d']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        title="test"
        width={500}
        height={300}
        data={isLoading ? dummyData : data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis width={20} allowDecimals={false} />
        {!isLoading && <Tooltip />}
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer >
  )
}

export default TicketsByStatus
