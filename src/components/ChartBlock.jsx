import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card, CardContent } from './ui/card'

const data = [
  { name: 'Mon', value: 30 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 28 },
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 80 },
  { name: 'Sun', value: 35 },
]

function ChartBlock() {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">📊 Weekly Performance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default ChartBlock
