import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'

function LivePriceBlock() {
  const [dataRows, setDataRows] = useState([])
  const [debugLog, setDebugLog] = useState([])

  useEffect(() => {
    async function fetchSheetData() {
      try {
        const debug = []

        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vS6QSHf5TW6PjC2iIx1bVvC4MsZS62IbrJ0jqbUeQTzI6NnrnAiCRVdpOm135LCF3ynJrdfVeEBJx9v/pub?gid=1245255006&single=true&output=csv'
        )
        const csvText = await response.text()
        debug.push('✅ CSV fetched successfully')

        const rows = csvText
          .trim()
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.length && row[0].trim() !== '')

        const header = rows[0].map(h => h.trim())
        const tickerIndex = header.indexOf('Ticker')
        const priceIndex = header.indexOf('Price')
        const costBasisIndex = header.indexOf('Cost Basis')

        if (tickerIndex === -1 || priceIndex === -1 || costBasisIndex === -1) {
          debug.push('❌ Missing required columns')
        } else {
          const parsed = rows.slice(1).map(row => {
            const ticker = row[tickerIndex]?.trim()
            const price = parseFloat(row[priceIndex])
            const costBasis = parseFloat(row[costBasisIndex])

            let signal = 'TBD'
            if (!isNaN(price) && !isNaN(costBasis)) {
              if (price > costBasis * 1.1) {
                signal = 'SELL'
              } else if (price < costBasis * 0.9) {
                signal = 'BUY'
              } else {
                signal = 'HOLD'
              }
            }

            return { ticker, price, costBasis, signal }
          })

          setDataRows(parsed)
          debug.push(`✅ Parsed ${parsed.length} rows with signals`)
        }

        setDebugLog(debug)
      } catch (error) {
        setDebugLog([`❌ FETCH ERROR: ${error.message}`])
      }
    }

    fetchSheetData()
    const interval = setInterval(fetchSheetData, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">📈 Live Market Snapshot + Signals</h2>
        <div className="grid grid-cols-2 gap-4">
          {dataRows.map((row, i) => (
            <div key={i} className="p-2 border rounded shadow bg-white">
              <div className="font-semibold text-blue-600">{row.ticker}</div>
              <div className="text-green-600">${row.price?.toFixed(2)}</div>
              <div className={`text-sm font-bold ${
                row.signal === 'BUY' ? 'text-green-600' :
                row.signal === 'SELL' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                Signal: {row.signal}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded text-xs font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
          <strong>🧪 Debug Log:</strong>
          <br />
          {debugLog.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LivePriceBlock
