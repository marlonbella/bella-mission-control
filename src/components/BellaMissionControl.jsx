import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import ChartBlock from './ChartBlock'
import LivePriceBlock from './LivePriceBlock'

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2p9jbvdRmcxpy2f8L7F5mA0UqspPpDUcgvikKB0xI-skrJiHONOCmWEsz-TByrSrk/exec";
const ALPACA_API_KEY = "PKYS5R7YJI7TY2EUOPG0";
const ALPACA_SECRET = "oAXZhrEauhvknN5hO54CUQNYMaMoUAbLuqkPBmsT";

const tickers = [
  { symbol: "SPY", sheetPriceCell: 586.84, sheetSharesCell: 10, pl: 140.23 },
  { symbol: "META", sheetPriceCell: 305.21, sheetSharesCell: 5, pl: -45.1 },
];

const placeTradeToSheet = async (type, tickerData) => {
  const trade = {
    ticker: tickerData.symbol,
    type: type,
    price: tickerData.sheetPriceCell,
    shares: tickerData.sheetSharesCell,
    pl: tickerData.pl,
    strategy: "Manual",
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(trade),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`✅ Trade sent to sheet: ${type} ${trade.ticker}`);
    } else {
      throw new Error("Failed to log trade to sheet");
    }
  } catch (err) {
    console.error("❌ Error logging trade to sheet:", err);
  }
};

const placeAlpacaOrder = async (symbol, qty, side) => {
  try {
    const response = await fetch("https://paper-api.alpaca.markets/v2/orders", {
      method: "POST",
      headers: {
        "APCA-API-KEY-ID": ALPACA_API_KEY,
        "APCA-API-SECRET-KEY": ALPACA_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol,
        qty,
        side: side.toLowerCase(),
        type: "market",
        time_in_force: "gtc",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Alpaca Order Placed:", data);
    } else {
      throw new Error("❌ Alpaca Order Failed");
    }
  } catch (err) {
    console.error(err.message);
  }
};

function BellaMissionControl() {
  const [progress, setProgress] = useState(40);

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

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">📋 Trade Controls</h2>
          <div className="space-y-4">
            {tickers.map((t) => (
              <div key={t.symbol} className="border p-3 rounded shadow">
                <h3 className="font-semibold">{t.symbol}</h3>
                <p>Price: ${t.sheetPriceCell}</p>
                <p>Shares: {t.sheetSharesCell}</p>
                <p className={t.pl >= 0 ? "text-green-600" : "text-red-600"}>P/L: ${t.pl}</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => {
                    placeTradeToSheet("BUY", t);
                    placeAlpacaOrder(t.symbol, t.sheetSharesCell, "buy");
                  }}>Buy</Button>
                  <Button onClick={() => {
                    placeTradeToSheet("SELL", t);
                    placeAlpacaOrder(t.symbol, t.sheetSharesCell, "sell");
                  }} variant="secondary">Sell</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ChartBlock />
    </div>
  );
}

export default BellaMissionControl;
