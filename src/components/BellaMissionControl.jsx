import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import ChartBlock from './ChartBlock'
import LivePriceBlock from './LivePriceBlock'

function BellaMissionControl() {
  const [progress, setProgress] = useState(40)

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">🚀 Bella Mission Control Dashboard</h1>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">System Status</h2>
          <p>✅ Bella is active and running smoothly.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Progress Tracker</h2>
          <Progress value={progress} />
          <div className="mt-2 flex gap-2">
            <Button onClick={() => setProgress(Math.min(progress + 10, 100))}>Increase</Button>
            <Button onClick={() => setProgress(Math.max(progress - 10, 0))} variant="secondary">
              Decrease
            </Button>
          </div>
        </CardContent>
      </Card>

      <LivePriceBlock />

      <ChartBlock />
    </div>
  )
}

export default BellaMissionControl
