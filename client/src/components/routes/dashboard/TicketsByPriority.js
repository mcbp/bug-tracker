import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ResponsiveContainer, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TicketsByPriority = props => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/charts/tickets-by-priority')
      .then(res => {
        res.data.map(data => {
          switch (data._id) {
            case 1: return data._id = "High"
            case 2: return data._id = "Medium"
            case 3: return data._id = "Low"
            default: return null
          }
        })
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const dummyData = [
    { _id: 'High', count: 0 },
    { _id: 'Medium', count: 0 },
    { _id: 'Low', count: 0 }
  ]

  const colors = ["#a0191f", "#de363d", "#eb868a"]

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

export default TicketsByPriority
